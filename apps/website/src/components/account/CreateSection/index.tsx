'use client'

import InnerContainer from '@/components/ui/Container/Inner'
import styles from './styles.module.scss'
import { Button, Container } from '@/components/ui'
import { z } from 'zod'
import { useI18n } from '@/sdk/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect } from 'react'
import { trpc } from '@/sdk/lib/trpc/client'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const CreateAccountSection = () => {
  const router = useRouter()
  const { mutate, error, data } = trpc.account.create.useMutation()
  const t = useI18n()
  const schema = z
    .object({
      name: z
        .string()
        .nonempty({
          message: t('quixer.errors.required'),
        })
        .min(3, t('quixer.errors.minLength', { min: 3 }).toString())
        .max(50, t('quixer.errors.maxLength', { max: 50 }).toString()),
      email: z
        .string({
          required_error: t('quixer.errors.required'),
        })
        .email(t('quixer.errors.email')),
      password: z
        .string({
          required_error: t('quixer.errors.required'),
        })
        .min(3, t('quixer.errors.minLength', { min: 3 }).toString())
        .max(100, t('quixer.errors.maxLength', { max: 100 }).toString()),
      confirmPassword: z
        .string({
          required_error: t('quixer.errors.required'),
        })
        .min(3, t('quixer.errors.minLength', { min: 3 }).toString())
        .max(100, t('quixer.errors.maxLength', { max: 100 }).toString()),
      consent: z.boolean().refine((value) => value === true, {
        message: t('quixer.errors.consent'),
      }),
      terms: z.boolean().refine((value) => value === true, {
        message: t('quixer.errors.terms'),
      }),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('quixer.errors.passwordMatch'),
          path: ['confirmPassword'],
        })
      }
    })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    },
    [mutate]
  )

  useEffect(() => {
    if (!data) return

    const handleLogin = async () => {
      toast.success(t('quixer.success.createAccount'))

      const res = await signIn('credentials', {
        redirect: true,
        email: data?.email,
        password: data?.originalPassword,
      })

      if (!res?.error) {
        router.refresh()
      } else {
        reset()
        toast.error(t('quixer.errors.invalidLogin'))
      }
    }

    handleLogin()
  }, [data, reset, router, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <Container title={t('quixer.geral.createAccount')}>
      <div className={styles.qxCreateAccountForm}>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
          <InnerContainer>
            <div data-qx-inputs-wrapper>
              <div data-qx-form-input data-qx-form-input-error={!!errors?.name}>
                <label htmlFor="name">{t('quixer.geral.name')}:</label>
                <input
                  autoComplete="given-name"
                  type="text"
                  {...register('name')}
                />
              </div>
              <div
                data-qx-form-input
                data-qx-form-input-error={!!errors?.email}
              >
                <label htmlFor="email">{t('quixer.geral.email')}:</label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                />
              </div>
              <div
                data-qx-form-input
                data-qx-form-input-error={!!errors?.password}
              >
                <label htmlFor="password">{t('quixer.geral.password')}:</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                />
              </div>
              <div
                data-qx-form-input
                data-qx-form-input-error={!!errors?.confirmPassword}
              >
                <label htmlFor="confirmPassword">
                  {t('quixer.geral.confirmPassword')}:
                </label>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                />
              </div>
            </div>
          </InnerContainer>
          <InnerContainer>
            <label data-qx-input-consent>
              <input type="checkbox" {...register('consent')} />
              {t('quixer.geral.consent')}
            </label>
          </InnerContainer>
          <InnerContainer>
            <div data-qx-input-terms-wrapper>
              <h2 data-qx-input-terms-title>
                {t('quixer.geral.selectCheckbox')}
              </h2>
              <label data-qx-input-terms>
                <input type="checkbox" {...register('terms')} />
                {t('quixer.geral.terms')}
              </label>
            </div>
          </InnerContainer>
          {Object.keys(errors).length > 0 && (
            <InnerContainer>
              <div data-qx-form-errors-wrapper>
                <h2 data-qx-form-errors-title>{t('quixer.geral.attention')}</h2>
                <ul data-qx-form-errors-list>
                  {Object.entries(errors).map(([key, value]) => {
                    if (!value.message) return null

                    let keyName = key

                    switch (key) {
                      case 'name':
                        keyName = t('quixer.geral.name')
                        break
                      case 'email':
                        keyName = t('quixer.geral.email')
                        break
                      case 'password':
                        keyName = t('quixer.geral.password')
                        break
                      case 'confirmPassword':
                        keyName = t('quixer.geral.confirmPassword')
                        break
                      case 'consent':
                        keyName = t('quixer.geral.fieldConsent')
                        break
                      case 'terms':
                        keyName = t('quixer.geral.fieldTerms')
                        break
                      default:
                        break
                    }

                    return (
                      <li data-qx-form-error-item key={key}>
                        <span>
                          <b>{keyName}:</b>
                          {value.message}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </InnerContainer>
          )}
          <div data-qx-form-actions>
            <Button variant="regular" type="submit">
              {t('quixer.geral.createAccount')}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default CreateAccountSection

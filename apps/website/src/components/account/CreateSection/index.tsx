'use client'

import InnerContainer from '@/components/ui/Container/Inner'
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
      <div>
        <form onSubmit={handleSubmit(handleDataSubmit)}>
          <InnerContainer>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-end gap-1">
                <label
                  className="label text-sm w-[20%] md:w-[17%] md:text-base"
                  htmlFor="name"
                >
                  {t('quixer.geral.name')}:
                </label>
                <input
                  className={`input flex-1 ${
                    !!errors?.name && 'border border-error focus:outline-0'
                  }}`}
                  autoComplete="given-name"
                  type="text"
                  {...register('name')}
                />
              </div>
              <div className="flex items-center justify-end gap-1">
                <label
                  className="label text-sm w-[20%] md:w-[17%] md:text-base"
                  htmlFor="email"
                >
                  {t('quixer.geral.email')}:
                </label>
                <input
                  type="email"
                  className={`input flex-1 ${
                    !!errors?.email && 'border border-error focus:outline-0'
                  }}`}
                  autoComplete="email"
                  {...register('email')}
                />
              </div>
              <div className="flex items-center justify-end gap-1">
                <label
                  className="label text-sm w-[20%] md:w-[17%] md:text-base"
                  htmlFor="password"
                >
                  {t('quixer.geral.password')}:
                </label>
                <input
                  className={`input flex-1 ${
                    !!errors?.password && 'border border-error focus:outline-0'
                  }}`}
                  type="password"
                  autoComplete="new-password"
                  {...register('password')}
                />
              </div>
              <div className="flex items-center justify-end gap-1">
                <label
                  className="label text-sm w-[20%] md:w-[17%] md:text-base"
                  htmlFor="confirmPassword"
                >
                  {t('quixer.geral.confirmPassword')}:
                </label>
                <input
                  className={`input flex-1 ${
                    !!errors?.confirmPassword &&
                    'border border-error focus:outline-0'
                  }}`}
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword')}
                />
              </div>
            </div>
          </InnerContainer>
          <InnerContainer>
            <label className="text-sm text-secondary">
              <input
                className="mr-1"
                type="checkbox"
                {...register('consent')}
              />
              {t('quixer.geral.consent')}
            </label>
          </InnerContainer>
          <InnerContainer>
            <div className="flex flex-col gap-2">
              <h2 className="text-base font-bold text-secondary">
                {t('quixer.geral.selectCheckbox')}
              </h2>
              <label className="text-sm text-secondary">
                <input
                  className="mr-1"
                  type="checkbox"
                  {...register('terms')}
                />
                {t('quixer.geral.terms')}
              </label>
            </div>
          </InnerContainer>
          {Object.keys(errors).length > 0 && (
            <InnerContainer>
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-bold text-secondary">
                  {t('quixer.geral.attention')}
                </h2>
                <ul className="flex flex-col gap-2">
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
                      <li className="flex items-center gap-1" key={key}>
                        <span className="flex items-center gap-1 text-sm text-error">
                          <b className="font-bold capitalize text-secondary">
                            {keyName}:
                          </b>
                          {value.message}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </InnerContainer>
          )}
          <div className="flex justify-end">
            <Button variant="info" type="submit">
              {t('quixer.geral.createAccount')}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default CreateAccountSection

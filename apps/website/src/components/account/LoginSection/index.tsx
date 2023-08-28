'use client'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container } from '@/components/ui'
import styles from './login-form.module.scss'
import { useCallback } from 'react'
import { useI18n } from '@/locales/client'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import InnerContainer from '@/components/ui/Container/Inner'

export const AccountLoginSection = () => {
  const router = useRouter()
  const t = useI18n()
  const schema = z.object({
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
  })

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      const res = await signIn('credentials', {
        redirect: false,
        email: data?.email,
        password: data?.password,
      })

      if (!res?.error) {
        router.refresh()
      } else {
        resetField('password')
        toast.error(t('quixer.errors.invalidLogin'))
      }
    },
    [router, t, resetField]
  )

  return (
    <Container title={t('quixer.account.form')}>
      <InnerContainer>
        <form
          className={`${styles.qxLoginForm}`}
          onSubmit={handleSubmit(handleDataSubmit)}
        >
          <div
            data-qx-login-form-input
            data-qx-login-form-input-error={!!errors?.email}
          >
            <label htmlFor="email">{t('quixer.account.email')}:</label>
            <input type="email" {...register('email')} />
            <span data-qx-login-form-error>{errors?.email?.message}</span>
          </div>
          <div
            data-qx-login-form-input
            data-qx-login-form-input-error={!!errors?.password}
          >
            <label htmlFor="password">{t('quixer.account.password')}:</label>
            <input type="password" {...register('password')} />
            <span data-qx-login-form-error>{errors?.password?.message}</span>
          </div>
          <div data-qx-login-form-actions>
            <Button variant="regular" type="button" disabled={isSubmitting}>
              Lost Account
            </Button>
            <Button variant="regular" type="submit" disabled={isSubmitting}>
              {t('quixer.account.login')}
            </Button>
          </div>
        </form>
      </InnerContainer>
    </Container>
  )
}

export default AccountLoginSection

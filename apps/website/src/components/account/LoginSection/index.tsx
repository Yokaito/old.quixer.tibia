'use client'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Container } from '@/components/ui'
import { useCallback } from 'react'
import { useI18n } from '@/sdk/locales/client'
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
      <form onSubmit={handleSubmit(handleDataSubmit)}>
        <InnerContainer className="flex flex-col gap-2">
          <div className="flex w-full">
            <label className="w-[25%] label md:w-[10%]" htmlFor="email">
              {t('quixer.account.email')}:
            </label>
            <input
              className={`flex-1 input ${
                !!errors?.email && 'border border-error focus:outline-0'
              }`}
              type="email"
              {...register('email')}
            />
          </div>
          <div className="flex w-full">
            <label className="w-[25%] label md:w-[10%]" htmlFor="password">
              {t('quixer.account.password')}:
            </label>
            <input
              className="flex-1 input"
              type="password"
              {...register('password')}
            />
          </div>
        </InnerContainer>
        {(!!errors?.email || !!errors?.password) && (
          <InnerContainer className="flex flex-col gap-1">
            <h1 className="text-base font-bold text-secondary">
              {t('quixer.geral.attention')}
            </h1>
            <span className="text-[12px] font-normal text-error">
              {errors?.email?.message}
            </span>
            <span className="text-[12px] font-normal text-error">
              {errors?.password?.message}
            </span>
          </InnerContainer>
        )}

        <InnerContainer>
          <div className="flex justify-between gap-2 md:justify-end">
            <Button variant="info" type="button" disabled={isSubmitting}>
              Lost Account
            </Button>
            <Button variant="info" type="submit" disabled={isSubmitting}>
              {t('quixer.account.login')}
            </Button>
          </div>
        </InnerContainer>
      </form>
    </Container>
  )
}

export default AccountLoginSection

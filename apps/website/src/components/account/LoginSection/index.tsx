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
import Input from '@/components/ui/Input'
import { FormErrors } from '@/components/ui/Errors/FormErrors'

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
            <Input
              className="flex-1"
              {...register('email')}
              type="email"
              hasError={!!errors?.email}
            />
          </div>
          <div className="flex w-full">
            <label className="w-[25%] label md:w-[10%]" htmlFor="password">
              {t('quixer.account.password')}:
            </label>
            <Input
              className="flex-1"
              {...register('password')}
              type="password"
              hasError={!!errors?.password}
            />
          </div>
        </InnerContainer>
        <FormErrors fields={errors} />

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

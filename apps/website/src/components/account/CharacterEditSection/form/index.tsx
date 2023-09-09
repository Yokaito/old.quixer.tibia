'use client'

import { Button } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { FormErrors } from '@/components/ui/Errors/FormErrors'
import Input from '@/components/ui/Input'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type Props = {
  id: number
  ishidden: boolean
  comment?: string
}

export const CharacterEditForm = ({ id, ishidden, comment = '' }: Props) => {
  const t = useI18n()
  const utils = trpc.useContext()
  const schema = z.object({
    ishidden: z.boolean(),
    comment: z
      .string()
      .max(255, t('quixer.errors.maxLength', { max: 255 }))
      .optional(),
  })
  const { mutate, error, data } = trpc.players.editMyCharacter.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      ishidden,
      comment,
    },
    resolver: zodResolver(schema),
  })

  const handleDataSubmit = useCallback(
    async (data: z.infer<typeof schema>) => {
      mutate({
        id,
        ...data,
      })
    },
    [mutate, id]
  )

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.characterEdited'))
    utils.players.getMyByName.invalidate()
  }, [data, utils, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <form onSubmit={handleSubmit(handleDataSubmit)}>
      <InnerContainer>
        <div className="flex flex-col gap-2 xl:gap-4">
          <div className="flex flex-col w-full gap-1 xl:gap-0 xl:flex-row">
            <label className="text-sm font-bold xl:w-48 label xl:text-base">
              {t('quixer.geral.hideAccount')}:
            </label>
            <span className="flex flex-row items-center flex-1 gap-2 text-sm label">
              <Input
                type="checkbox"
                {...register('ishidden')}
                hasError={!!errors.ishidden}
              />

              {t('quixer.geral.labelHideAccount')}
            </span>
          </div>
          <div className="flex flex-col w-full gap-1 xl:gap-0 xl:flex-row">
            <label className="text-sm font-bold xl:w-48 label xl:text-base">
              {t('quixer.geral.comment')}:
            </label>
            <textarea
              maxLength={255}
              {...register('comment')}
              className="flex-1 input min-h-[100px] max-h-28"
            />
          </div>
        </div>
      </InnerContainer>
      <FormErrors fields={errors} />

      <InnerContainer className="flex justify-end">
        <Button type="submit" variant="info">
          {t('quixer.geral.confirm')}
        </Button>
      </InnerContainer>
    </form>
  )
}

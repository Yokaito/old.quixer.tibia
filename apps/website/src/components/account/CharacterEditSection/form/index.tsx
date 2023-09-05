'use client'

import { Button } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
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
  const utils = trpc.useContext()
  const schema = z.object({
    ishidden: z.boolean(),
    // optional comment
    comment: z.string().max(255).optional(),
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

    toast.success('Editado com sucesso')
    utils.players.getMyByName.invalidate()
  }, [data, utils])

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
              Hide Account:
            </label>
            <span className="flex flex-row items-center flex-1 gap-2 text-sm label">
              <input
                className="input"
                type="checkbox"
                {...register('ishidden')}
              />
              check to hide your account information
            </span>
          </div>
          <div className="flex flex-col w-full gap-1 xl:gap-0 xl:flex-row">
            <label className="text-sm font-bold xl:w-48 label xl:text-base">
              Comment:
            </label>
            <textarea
              maxLength={255}
              {...register('comment')}
              className="flex-1 input min-h-[48px] max-h-28"
            />
          </div>
        </div>
      </InnerContainer>
      {errors?.comment && (
        <InnerContainer>
          <div>
            <h1 className="text-base font-bold xl:text-lg text-secondary">
              Attention
            </h1>
            <span className="flex items-center gap-2 text-sm text-red-500">
              <b className="text-secondary">Comment:</b>
              {errors.comment.message}
            </span>
          </div>
        </InnerContainer>
      )}

      <InnerContainer className="flex justify-end">
        <Button type="submit" variant="info">
          Save
        </Button>
      </InnerContainer>
    </form>
  )
}

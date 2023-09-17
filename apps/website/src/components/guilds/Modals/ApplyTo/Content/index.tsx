'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { cn } from '@/sdk/utils/tailwind'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type Props = {
  handleModal: (_value: boolean) => void
  guildId: number
}

export const ModalGuildApplyToContent = ({ handleModal, guildId }: Props) => {
  const router = useRouter()
  const t = useI18n()
  const { data } = trpc.guilds.getCharacterAllowToApply.useQuery(guildId)
  const { mutateAsync } = trpc.guilds.applyToGuild.useMutation()
  const schema = z.object({
    characterId: z
      .string()
      .nonempty({
        message: t('quixer.errors.required'),
      })
      .refine(
        (value) => {
          return data?.some((character) => character.id === Number(value))
        },
        {
          message: t('quixer.errors.invalidCharacterApplication'),
        }
      ),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const handleApplySubmit = useCallback(
    (data: z.infer<typeof schema>) => {
      mutateAsync(
        {
          guildId,
          playerId: Number(data.characterId),
        },
        {
          onSuccess: () => {
            toast.success(t('quixer.success.applySuccess'))
            handleModal(false)
            router.refresh()
          },
          onError: (error) => {
            toast.error(error?.message)
          },
        }
      )
    },
    [mutateAsync, guildId, handleModal, router, t]
  )

  return (
    <Container
      title={t('quixer.geral.applyToGuild')}
      onClose={() => handleModal(false)}
    >
      <form onSubmit={handleSubmit(handleApplySubmit)}>
        <InnerContainer className="flex flex-col">
          <label className="label">{t('quixer.geral.character')}</label>
          <select
            className={cn('w-full input', {
              'border border-error focus:outline-0': errors.characterId,
            })}
            {...register('characterId')}
          >
            <option value="0">{t('quixer.geral.selectCharacter')}</option>
            {data?.map((character) => (
              <option key={character.id} value={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        </InnerContainer>
        <InnerContainer>
          <footer className="flex justify-between gap-3">
            <Button
              variant="red"
              type="button"
              disabled={false}
              onClick={() => null}
            >
              {t('quixer.geral.close')}
            </Button>
            <Button variant="green" type="submit" disabled={false}>
              {t('quixer.geral.apply')}
            </Button>
          </footer>
        </InnerContainer>
      </form>
    </Container>
  )
}

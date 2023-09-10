'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import env from '@/sdk/env'

type Props = {
  characterName: string
  characterId: number
  handleModal: (_value: boolean) => void
}

export const ContentModalDelete = ({
  characterId,
  characterName,
  handleModal,
}: Props) => {
  const router = useRouter()
  const t = useI18n()
  const { mutateAsync } = trpc.players.delete.useMutation()

  const handleDelete = useCallback(() => {
    mutateAsync(characterId, {
      onSuccess: () => {
        toast.success(t('quixer.success.characterDeletion'))
        handleModal(false)
        router.refresh()
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })
  }, [characterId, mutateAsync, handleModal, t, router])

  return (
    <Container title={`${t('quixer.geral.delete')}, ${characterName}`}>
      <InnerContainer className="flex">
        <span className="w-full text-base text-center text-secondary">
          {t('quixer.geral.confirmDeletion')} <br /> <b>{characterName}</b>
        </span>
      </InnerContainer>
      <InnerContainer className="flex flex-col">
        <span className="w-full text-xl font-bold text-center text-error">
          {t('quixer.geral.attention')}
        </span>
        <span className="w-full text-sm text-center text-secondary">
          {t('quixer.geral.infoDeletion', {
            number: env.NEXT_PUBLIC_DELETE_CHARACTER_TIME,
          })}
        </span>
      </InnerContainer>
      <InnerContainer>
        <footer className="flex justify-between gap-3">
          <Button variant="red" onClick={() => handleModal(false)}>
            {t('quixer.geral.close')}
          </Button>
          <Button variant="green" onClick={handleDelete}>
            {t('quixer.geral.confirm')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

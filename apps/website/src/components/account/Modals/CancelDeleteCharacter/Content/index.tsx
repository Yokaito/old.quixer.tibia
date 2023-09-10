'use client'

import { Button, Container } from '@/components/ui'
import type { Props } from '..'
import { useCallback } from 'react'
import { useI18n } from '@/sdk/locales/client'
import { trpc } from '@/sdk/lib/trpc/client'
import { toast } from 'react-toastify'
import InnerContainer from '@/components/ui/Container/Inner'
import { useRouter } from 'next/navigation'

interface ContentProps extends Props {
  handleModal: (_value: boolean) => void
}

export const ContentModalCancel = ({
  characterId,
  characterName,
  handleModal,
}: ContentProps) => {
  const router = useRouter()
  const t = useI18n()
  const { mutateAsync } = trpc.players.cancelDeletion.useMutation()

  const handleCancel = useCallback(() => {
    mutateAsync(characterId, {
      onSuccess: () => {
        toast.success(t('quixer.success.characterDeletionCancel'))
        handleModal(false)
        router.refresh()
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })
  }, [characterId, mutateAsync, handleModal, router, t])

  return (
    <Container title={`${t('quixer.geral.cancelDeletion')}, ${characterName}`}>
      <InnerContainer className="flex">
        <span className="w-full text-base text-center text-secondary">
          {t('quixer.geral.confirmCancelDeletion', {
            name: characterName,
          })}
        </span>
      </InnerContainer>
      <InnerContainer>
        <footer className="flex justify-between gap-3">
          <Button variant="red" onClick={() => handleModal(false)}>
            {t('quixer.geral.close')}
          </Button>
          <Button variant="green" onClick={handleCancel}>
            {t('quixer.geral.confirm')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

type Props = {
  handleModal: (_value: boolean) => void
  playerId: number
  playerName: string
}

export const ModalGuildApplyToContent = ({
  handleModal,
  playerId,
  playerName,
}: Props) => {
  const router = useRouter()
  const { mutateAsync, isLoading } = trpc.guilds.leaveGuild.useMutation()
  const t = useI18n()

  const handleSubmit = useCallback(() => {
    mutateAsync(playerId, {
      onSuccess: () => {
        toast.success(
          t('quixer.success.leftGuildSuccess', {
            name: playerName,
          })
        )
        handleModal(false)
        router.refresh()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }, [playerId, mutateAsync, playerName, handleModal, router, t])

  return (
    <Container
      title={t('quixer.geral.leaveGuild')}
      onClose={() => handleModal(false)}
    >
      <InnerContainer>
        <p className="text-base text-center text-secondary">
          {t('quixer.geral.leaveGuildQuestion')}{' '}
          <b>&lsquo;{playerName}&lsquo;</b> ?
        </p>
      </InnerContainer>
      <InnerContainer>
        <footer className="flex justify-between gap-3">
          <Button
            variant="red"
            type="button"
            disabled={false}
            onClick={() => handleModal(false)}
          >
            {t('quixer.geral.close')}
          </Button>
          <Button
            variant="green"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {t('quixer.geral.accept')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

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
  guildId: number
  playerId: number
}

export const ModalGuildHandleInvitationContent = ({
  handleModal,
  guildId,
  playerId,
}: Props) => {
  const t = useI18n()
  const router = useRouter()
  const { mutateAsync: mutateAsyncAccept, isLoading: isLoadingAccept } =
    trpc.guilds.acceptInviteForGuild.useMutation()
  const { mutateAsync: mutateAsyncReject, isLoading: isLoadingReject } =
    trpc.guilds.rejectInviteForGuild.useMutation()

  const handleAcceptSubmit = useCallback(() => {
    mutateAsyncAccept(
      {
        guildId,
        playerId,
      },
      {
        onSuccess: () => {
          toast.success(t('quixer.success.guildInviteAccepted'))
          handleModal(false)
          router.refresh()
        },
        onError: (error) => {
          toast.error(error?.message)
        },
      }
    )
  }, [guildId, playerId, mutateAsyncAccept, handleModal, router, t])

  const handleRejectSubmit = useCallback(() => {
    mutateAsyncReject(
      {
        guildId,
        playerId,
      },
      {
        onSuccess: () => {
          toast.success(t('quixer.success.guildInviteRejected'))
          handleModal(false)
          router.refresh()
        },
        onError: (error) => {
          toast.error(error?.message)
        },
      }
    )
  }, [guildId, playerId, mutateAsyncReject, handleModal, router, t])

  return (
    <Container
      title={t('quixer.geral.guildTitleAccept')}
      onClose={() => handleModal(false)}
    >
      <InnerContainer className="flex flex-col">
        <span className="text-base text-center text-secondary">
          {t('quixer.geral.guildWantToAccept')}
        </span>
      </InnerContainer>
      <InnerContainer>
        <footer className="flex justify-between gap-3">
          <Button
            variant="red"
            type="button"
            disabled={isLoadingAccept || isLoadingReject}
            onClick={handleRejectSubmit}
          >
            {t('quixer.geral.reject')}
          </Button>
          <Button
            onClick={handleAcceptSubmit}
            variant="green"
            type="button"
            disabled={isLoadingAccept || isLoadingReject}
          >
            {t('quixer.geral.accept')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

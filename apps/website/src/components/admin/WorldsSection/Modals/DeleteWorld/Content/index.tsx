'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

type ModalDeleteWorldContentProps = {
  worldId: number
  worldName: string
  handleModal: (_value: boolean) => void
}

export const ModalDeleteWorldContent = ({
  worldId,
  worldName,
  handleModal,
}: ModalDeleteWorldContentProps) => {
  const utils = trpc.useContext()
  const t = useI18n()
  const world = trpc.worlds.world.useQuery(worldId)
  const worldCountPlayers = trpc.players.byWorldCount.useQuery(worldId)
  const { mutate, data, error } = trpc.worlds.delete.useMutation()

  const handleSubmit = useCallback(() => {
    mutate(worldId)
  }, [mutate, worldId])

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.worldDeleted'))
    utils.worlds.all.invalidate()
    handleModal(false)
  }, [data, utils, worldId, handleModal, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <Container
      title={`${t('quixer.geral.delete')}, ${worldName}`}
      onClose={() => handleModal(false)}
    >
      <InnerContainer
        className="flex flex-col"
        data-qx-modal-delete-world-wrapper
      >
        <span
          className="text-base text-center text-secondary"
          data-qx-modal-paragraph
        >
          {t('quixer.geral.countPlayerWorld', {
            count: worldCountPlayers.data?.players,
          })}
          <br />
          {t('quixer.geral.deleteWorld')} <br />
          <strong>{worldName}</strong>?
        </span>
      </InnerContainer>
      <InnerContainer>
        <footer className="flex justify-between gap-3">
          <Button
            variant="red"
            type="button"
            onClick={() => handleModal(false)}
          >
            {t('quixer.geral.close')}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="green"
            type="button"
            disabled={world.isLoading}
          >
            {t('quixer.geral.confirm')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

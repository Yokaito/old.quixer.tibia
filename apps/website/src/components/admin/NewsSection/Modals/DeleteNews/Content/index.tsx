'use client'

import { Button, Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import { trpc } from '@/sdk/lib/trpc/client'
import { useI18n } from '@/sdk/locales/client'
import { useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

type Props = {
  handleModal: (_value: boolean) => void
  newsId: number
  newsTitle: string
}

export const ContentDeleteNewsModal = ({
  handleModal,
  newsId,
  newsTitle,
}: Props) => {
  const utils = trpc.useContext()
  const news = trpc.news.getById.useQuery(newsId)
  const { mutate, data, error } = trpc.news.deleteById.useMutation()
  const t = useI18n()

  const handleSubmit = useCallback(() => {
    mutate(newsId)
  }, [mutate, newsId])

  useEffect(() => {
    if (!data) return

    toast.success(t('quixer.success.newsDeleted'))
    utils.news.getAllWithCreators.invalidate()
    utils.news.all.invalidate()
    handleModal(false)
  }, [data, utils, handleModal, t])

  useEffect(() => {
    if (!error) return

    toast.error(error?.message)
  }, [error])

  return (
    <Container
      title={`${t('quixer.geral.delete')}, ${newsTitle}`}
      onClose={() => handleModal(false)}
    >
      <InnerContainer className="flex flex-col">
        <span className="text-base text-center text-secondary">
          {t('quixer.geral.deleteNews')} <br />
          <strong>{newsTitle}</strong> ?
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
            disabled={news.isLoading}
          >
            {t('quixer.geral.confirm')}
          </Button>
        </footer>
      </InnerContainer>
    </Container>
  )
}

'use client'

import { Button, Modal } from '@/components/ui'
import { useState } from 'react'
import { useI18n } from '@/sdk/locales/client'
import { CreateWorldContent } from './Content'

export const CreateWorldModal = () => {
  const [open, setOpen] = useState(false)
  const t = useI18n()

  return (
    <>
      <div>
        <Button onClick={() => setOpen(!open)} variant="info">
          {t('quixer.geral.createWorld')}
        </Button>

        {open && (
          <Modal open={open}>
            <CreateWorldContent handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

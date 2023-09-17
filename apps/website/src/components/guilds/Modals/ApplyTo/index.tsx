'use client'

import { Button, Modal } from '@/components/ui'

import { useState } from 'react'
import { ModalGuildApplyToContent } from './Content'
import { useI18n } from '@/sdk/locales/client'

type Props = {
  guildId: number
}

export const ModalGuildApplyTo = (props: Props) => {
  const t = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button variant="info" onClick={() => setOpen(!open)}>
          {t('quixer.geral.applyToGuild')}
        </Button>

        {open && (
          <Modal open={open}>
            <ModalGuildApplyToContent {...props} handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

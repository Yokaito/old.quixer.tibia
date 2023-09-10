'use client'

import { Button, Modal } from '@/components/ui'
import Icon from '@/components/ui/Icon'
import { useState } from 'react'
import { ContentModalCancel } from './Content'

export type Props = {
  characterName: string
  characterId: number
}

export const ModalCancelDeleteCharacter = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button className="text-secondary" onClick={() => setOpen(!open)}>
          <Icon name="Prohibit" width={18} height={18} />
        </Button>

        {open && (
          <Modal open={open}>
            <ContentModalCancel {...props} handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default ModalCancelDeleteCharacter

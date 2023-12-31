'use client'

import { Button, Modal } from '@/components/ui'
import Icon from '@/components/ui/Icon'
import { useState } from 'react'
import { ContentModalDelete } from './Content'

type ModalDeleteCharacterProps = {
  characterName: string
  characterId: number
}

export const ModalDeleteCharacter = (props: ModalDeleteCharacterProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button className="text-secondary" onClick={() => setOpen(!open)}>
          <Icon name="Trash" width={18} height={18} />
        </Button>

        {open && (
          <Modal open={open}>
            <ContentModalDelete {...props} handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

export default ModalDeleteCharacter

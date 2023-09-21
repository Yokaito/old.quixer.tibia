'use client'

import { Button, Modal } from '@/components/ui'

import { useState } from 'react'
import Image from 'next/image'
import XIcon from '@/assets/images/geral/icon_no.png'
import { ModalGuildApplyToContent } from './Content'

type Props = {
  playerId: number
  playerName: string
}

export const ModalGuildLeave = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button
          className="flex items-center justify-center w-full"
          onClick={() => setOpen(!open)}
        >
          <Image src={XIcon} alt="leave guild" />
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

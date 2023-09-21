'use client'

import { Button, Modal } from '@/components/ui'
import { useState } from 'react'
import { ModalGuildHandleInvitationContent } from './Content'
import Image from 'next/image'
import NoIcon from '@/assets/images/geral/icon_no.png'
import YesIcon from '@/assets/images/geral/icon_yes.png'

type Props = {
  guildId: number
  playerId: number
}

export const ModalGuildAcceptInvitation = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button
          className="flex justify-center w-full gap-1"
          onClick={() => setOpen(!open)}
        >
          <Image src={NoIcon} alt="no icon" />
          <Image src={YesIcon} alt="no icon" />
        </Button>

        {open && (
          <Modal open={open}>
            <ModalGuildHandleInvitationContent
              handleModal={setOpen}
              {...props}
            />
          </Modal>
        )}
      </div>
    </>
  )
}

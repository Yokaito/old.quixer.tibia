'use client'

import { Button, Modal } from '@/components/ui'
import { useState } from 'react'
import { ContentDeleteNewsModal } from './Content'
import DeleteButtonImg from '@/assets/images/buttons/circle-symbol-minus.gif'
import Image from 'next/image'

type Props = {
  newsId: number
  newsTitle: string
}

export const DeleteNewsModal = (props: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button onClick={() => setOpen(!open)}>
          <Image src={DeleteButtonImg} alt="Edit" quality={100} />
        </Button>

        {open && (
          <Modal open={open}>
            <ContentDeleteNewsModal {...props} handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

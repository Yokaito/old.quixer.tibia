'use client'

import { Button, Modal } from '@/components/ui'
import Image from 'next/image'
import { useState } from 'react'
import DeleteButtonImg from '@/assets/images/buttons/circle-symbol-minus.gif'
import styles from './styles.module.scss'
import { ModalDeleteWorldContent } from './Content'

type DeleteWorldModalProps = {
  worldId: number
  worldName: string
}

export const DeleteWorldModal = (props: DeleteWorldModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button onClick={() => setOpen(!open)}>
          <Image src={DeleteButtonImg} alt="Edit" quality={100} />
        </Button>

        {open && (
          <Modal open={open} className={styles.qxDeleteWorldModal}>
            <ModalDeleteWorldContent {...props} handleModal={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

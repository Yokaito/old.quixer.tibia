'use client'

import { Button, Modal } from '@/components/ui'
import Image from 'next/image'
import { useState } from 'react'
import EditButtonImg from '@/assets/images/buttons/button-watch-idle.png'
import styles from './styles.module.scss'
import { FormEditWorld } from './Form'

type EditWorldModalProps = {
  worldId: number
  worldName: string
}

export const EditWorldModal = (props: EditWorldModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button onClick={() => setOpen(!open)}>
          <Image src={EditButtonImg} alt="Edit" quality={100} />
        </Button>

        {open && (
          <Modal open={open} className={styles.qxModalEditWorld}>
            <FormEditWorld {...props} handleClose={setOpen} />
          </Modal>
        )}
      </div>
    </>
  )
}

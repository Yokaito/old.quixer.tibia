'use client'

import { Button, Container, Modal } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import Icon from '@/components/ui/Icon'
import { useState } from 'react'

type ModalDeleteCharacterProps = {
  characterName: string
  characterId: number
}

export const ModalDeleteCharacter = ({
  characterId,
  characterName,
}: ModalDeleteCharacterProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div>
        <Button className="text-secondary" onClick={() => setOpen(!open)}>
          <Icon name="Trash" width={18} height={18} />
        </Button>

        <Modal open={open}>
          <Container title={`Deletar, ${characterName}`}>
            <InnerContainer>
              {`Tem certeza que deseja deletar o personagem ${characterName}, ${characterId}?`}
            </InnerContainer>
            <InnerContainer>
              <footer
                data-qx-footer-modal
                className="flex justify-between gap-3"
              >
                <Button variant="red" onClick={() => setOpen(false)}>
                  Fechar
                </Button>
                <Button variant="green" onClick={() => console.log('1')}>
                  Confirmar
                </Button>
              </footer>
            </InnerContainer>
          </Container>
        </Modal>
      </div>
    </>
  )
}

export default ModalDeleteCharacter

import './Modal.scss'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = (props: ModalProps) => {
  const { isOpen, title, onClose, children } = props

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}>
        <div
          className="modal__body"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button className="modal__close" type="button" onClick={onClose}>
              X
            </button>
          </header>
          <div className="modal__children">{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default Modal

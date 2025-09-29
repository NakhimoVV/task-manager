import './Modal.scss'
import { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import IconClose from '@/shared/assets/icons/Close_round.svg?react'

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = (props: ModalProps) => {
  const { isOpen, title, onClose, children } = props
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dialog = dialogRef.current

  useEffect(() => {
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return createPortal(
    <dialog
      className="modal"
      ref={dialogRef}
      aria-labelledby="modal-window"
      hidden={!isOpen}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialog) {
          onClose()
        }
      }}
    >
      <div
        className="modal__content"
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
        <header className="modal__header">
          <h2 className="modal__title" id="modal-window">
            {title}
          </h2>
          <button
            className="modal__button-close"
            type="button"
            onClick={onClose}
            title="Close modal"
            aria-label="Close modal"
          >
            <IconClose width={24} height={24} />
          </button>
        </header>
        <div className="modal__children">{children}</div>
      </div>
    </dialog>,
    document.body,
  )
}

export default Modal

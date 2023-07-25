import { ReactNode, useEffect } from 'react'
interface IProps {
  id?: string
  children: ReactNode
  openModal?: boolean
  className?: string
}

export const Modal = ({ children, id, openModal, className }: IProps) => {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [openModal])

  return (
    <>
      {id && <input type="checkbox" id={id} className="modal-toggle" />}

      <div className={`modal ${!id && openModal ? 'modal-open' : ''}`}>
        <div
          className={`bg-base-100 m-8 md:m-0 p-6 w-[800px] max-h-[650px] 
        2xl:max-h-[700px] rounded-xl overflow-y-auto
        overflow-x-hidden scroll_none ${className}`}
        >
          {children}
          <div className="modal-action">
            {id && (
              <label htmlFor={id} className="btn">
                Cerrar!
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

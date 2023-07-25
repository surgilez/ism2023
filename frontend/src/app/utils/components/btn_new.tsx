/* eslint-disable no-unused-vars */

interface IProps {
  setOpenModal: (val: boolean) => void
  title: string
  active?: boolean
}

export const BtnNew = ({ setOpenModal, title, active = false }: IProps) => (
  <div className="flex gap-2 items-center">
    <button
      title="Crear nuevo form"
      type="button"
      id="membresi_id_new"
      className="btn btn-circle btn-accent bg-green-600 btn-sm"
      onClick={() => setOpenModal(true)}
      disabled={active}
    >
      <i className="fa-solid fa-plus text-xl text-white font-bold" />
    </button>
    <label
      htmlFor="membresi_id_new"
      className={`cursor-pointer underline  ${active && 'text-gray-500'}`}
    >
      {title}
    </label>
  </div>
)

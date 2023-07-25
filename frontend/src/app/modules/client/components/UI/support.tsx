import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

export const Support = () => {
  const { handleSubmit } = useFormik({
    initialValues: {
      msg: '',
    },
    onSubmit: (val, { resetForm }) => {
      resetForm()
    },
  })

  const navigate = useNavigate()

  const contactSupport = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${'+593 979792049'}&text=Hola%20International%20Signature%20necesito%20soporte`
    )
  }

  return (
    <div className="tooltip tooltip-bottom" data-tip="Soporte">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <i className="fa-solid fa-headset text-2xl btn btn-ghost btn-circle" />
          </div>
        </label>
        <div
          tabIndex={0}
          className={`mt-3 flex flex-col dropdown-content w-52 bg-base-100 
                    shadow-xl px-3 md:px-10 md:pt-2 w-full md:w-[400px] md:rounded-bl-[70px] 
                    md:rounded-tl-xl border rounded-xl`}
        >
          <span className="self-end text-sm hidden md:block">
            vendedor comercial
          </span>
          <div className="flex gap-2 mt-2">
            <i className="fa-solid fa-headset hidden md:block text-6xl text-[#6B6CB0]" />
            <form className="ml-6 form-control w-full" onSubmit={handleSubmit}>
              <div>
                <span className="block text-left">Te ayudamos?</span>
                <hr />
                {/* <textarea
                  className="textarea textarea-bordered w-full mt-2"
                  placeholder="En que podemos ayudarte..."
                  {...getFieldProps('msg')}
                /> */}
              </div>
              <div className=" flex flex-start justify-between mb-5 cursor-pointer">
                <div
                  className="btn btn-ghost btn-circle"
                  onClick={contactSupport}
                >
                  <i className="fa-brands fa-whatsapp text-2xl" />
                </div>
                {/* <button type="submit" className="btn btn__gold btn-sm mt-2">
                  Enviar
                  <i className="fa-solid fa-paper-plane ml-2" />
                </button> */}
                <button
                  type="button"
                  className="btn btn__gold btn-sm mt-2"
                  onClick={() => navigate('/client/chat')}
                >
                  Contáctanos
                  <i className="fa-solid fa-paper-plane ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

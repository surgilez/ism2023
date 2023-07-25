import { Form, Formik, Field } from 'formik'
import { IContacts } from '../interfaces/contacts'
import { useDispatch } from 'react-redux'
import { startSendContact } from '@redux/actions/contact'
export const ContactScreen = () => {
  const init: IContacts = {
    city: '',
    email: '',
    name: '',
    phone: '',
    country: '',
  }

  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={init}
      onSubmit={(val) => {
        dispatch(startSendContact(val))
      }}
    >
      <div className="bg-grandient-primary h-screen flex justify-center items-center">
        <div className="w-full flex justify-center py-10">
          <div className="w-full xl:w-[1200px] px-10 xl:px-0">
            <h3 className="text-[#002E53] font-bold text-4xl text-center">
              ¡Queremos brindarte la mejor atención
            </h3>
            <span className="text-center block text-xl text-gray-500 mt-3">
              Compártenos tus datos y un asesor se pondrá en contacto
            </span>
            <div className="w-full flex justify-center my-16">
              <i className="fa-solid fa-user-large text-white text-8xl" />
            </div>

            <Form className="flex flex-col gap-3">
              <Field
                name="name"
                type="text"
                className={`input w-full input-primary bg-transparent border-2 
                                border-blue-900 placeholder:text-xl placeholder:text-white text-white text-xl`}
                placeholder="Nombres y apellidos "
              />
              <div className="flex gap-3">
                <Field
                  name="country"
                  type="text"
                  placeholder="Pais"
                  className={`input w-1/2 input-primary bg-transparent border-2 
                                border-blue-900 placeholder:text-xl placeholder:text-white text-white text-xl`}
                />
                <Field
                  name="city"
                  type="text"
                  placeholder="Ciudad"
                  className="input w-1/2 input-primary bg-transparent border-2 
                                border-blue-900 placeholder:text-xl placeholder:text-white text-white text-xl"
                />
              </div>
              <Field
                name="email"
                type="email"
                className={`input w-full input-primary bg-transparent border-2 
                            border-blue-900 placeholder:text-xl placeholder:text-white text-white text-xl`}
                placeholder="Correo "
              />
              <div className="flex gap-3">
                <Field
                  name="phone"
                  type="phone"
                  placeholder="Teléfono"
                  className={`input w-1/2 input-primary bg-transparent border-2 
                                border-blue-900 placeholder:text-xl placeholder:text-white text-white text-xl`}
                />
                <button type="submit" className="btn w-1/2 btn_form_secondary">
                  Enviar
                </button>
              </div>
            </Form>

            <p className="text-center text-xl text-white mt-8">
              Nos contactaremos en breve
            </p>
          </div>
        </div>
      </div>
    </Formik>
  )
}

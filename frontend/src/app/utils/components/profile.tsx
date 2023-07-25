import AvatarNotFound from '@assets/notfoundavatar.jpg'
import { ComponentLoader } from './loader'
import { Form, Formik } from 'formik'
import { InputForm } from './form'
import { Profile } from '@utils/interfaces/profile'
import { Redux } from '@redux/interfaces/redux'
import { startEditProfile, startForgotPassword } from '@redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useImgInput } from '@utils/hooks/useImg'
import { usePromiseTracker } from 'react-promise-tracker'
import { useRef } from 'react'
import { validationsProfile } from '@utils/validations'

export const ProfileScreen = () => {
  const { img, name, lastName, phone, email } = useSelector(
    (i: Redux) => i.user
  )

  console.log(email)
  const inputImgRef = useRef<HTMLInputElement>(null)
  const refImg = useRef<HTMLImageElement>(null)

  const { handleChangeImg, handleOpenInputImg } = useImgInput({
    refImg,
    inputImgRef,
  })

  const dispatch = useDispatch()

  const init: Profile = { name, lastName, phone, email, img: null }
  const { promiseInProgress } = usePromiseTracker({ area: 'editProfile' })

  const cambioPassword = () => {
    dispatch(startForgotPassword(email))
  }

  return (
    <div className=" rounded-xl p-10">
      {promiseInProgress ? (
        <div className="min-h-[65vh] w-full grid place-content-center">
          <ComponentLoader bg="bg-primary" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-14">
          <div onClick={handleOpenInputImg}>
            <div className="avatar w-44 h-44 btn btn-ghost btn-circle ">
              <img
                src={`${process.env.BACKEND}/${img}` || AvatarNotFound}
                alt="avatar"
                ref={refImg}
                className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 "
              />
            </div>
          </div>

          <Formik
            initialValues={init}
            onSubmit={(val) => {
              dispatch(startEditProfile(val))
            }}
            validationSchema={validationsProfile}
          >
            {({ setFieldValue }) => (
              <Form className="my-5 flex flex-col w-full md:w-[400px]">
                <InputForm
                  name="name"
                  text="Nombre:"
                  placeholder="Ingresa tu nombre"
                  labelClassName="text-white font-bold my-2"
                  className="bg-transparent placeholder:text-white text-white border-2"
                  autoComplete="off"
                />
                <InputForm
                  name="lastName"
                  text="Apellido:"
                  placeholder="Ingresa tu apellido"
                  labelClassName="text-white my-2 font-bold"
                  className="bg-transparent placeholder:text-white text-white border-2"
                  autoComplete="off"
                />
                <InputForm
                  name="phone"
                  text="Teléfono celular:"
                  placeholder="Ingresa tu teléfono"
                  labelClassName="text-white my-2 font-bold"
                  className="bg-transparent placeholder:text-white text-white border-2"
                  autoComplete="off"
                />

                <InputForm
                  name="email"
                  text="Correo:"
                  placeholder="Ingresa tu correo electrónico"
                  labelClassName="text-white my-2 font-bold"
                  className="bg-transparent border-2 !border-primary disabled:bg-transparent"
                  autoComplete="off"
                  disabled
                />

                <input
                  id="file"
                  name="img"
                  type="file"
                  ref={inputImgRef}
                  onChange={(ev) => handleChangeImg(ev, setFieldValue)}
                  className="hidden"
                />
                <button
                  type="submit"
                  className="btn btn-primary button mt-4 gap-2 btn__gold "
                >
                  <i className="fa-solid fa-floppy-disk" />
                  <span>Guardar</span>
                </button>
              </Form>
            )}
          </Formik>
          <button
            onClick={cambioPassword}
            className="btn btn-primary button mt-4 gap-2 btn__gold "
          >
            <i className="fa-solid fa-lock" />
            <span>Cambiar Contraseña</span>
          </button>
        </div>
      )}
    </div>
  )
}

import { Field, Form, Formik } from 'formik'
import { Login } from '@modules/landing/interfaces/user'
import { startLogin } from '@redux/actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validationsSignIn } from '@modules/landing/validations/auth'

export const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const init: Login = {
    email: '',
    password: '',
  }

  return (
    <Formik
      initialValues={init}
      onSubmit={(val) => {
        dispatch(startLogin(val))
      }}
      validationSchema={validationsSignIn}
    >
      {({ errors, touched }: any) => (
        <div className="login bg-[#1d366f] text-white">
          <Form className="login__form" noValidate>
            <span className="text-xl block text-center">Identifícate</span>
            <div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Ingresa tu correo"
                  className="input input-bordered input-sm placeholder:text-black"
                  autoComplete="off"
                />
                {errors.email && touched.email && (
                  <div className="error text-white">{errors.email}</div>
                )}
              </div>
              <Field
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                autoComplete="off"
                className="input input-bordered input-sm placeholder:text-black"
              />
              {errors.password && touched.password && (
                <div className="error text-white">{errors.password}</div>
              )}

              <div className="mt-5 flex !gap-2 items-center">
                <span
                  className="cursor-pointer text-sm mr-2"
                  onClick={() => navigate('/forgot-password')}
                >
                  ¿Olvidaste tu clave?
                </span>
                <input
                  type="submit"
                  value="iniciar sesion"
                  className="btn btn__gold btn-sm"
                />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

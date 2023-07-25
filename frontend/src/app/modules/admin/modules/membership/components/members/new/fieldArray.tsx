/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldArray, FormikErrors } from 'formik'
import { InputForm } from '@utils/components/form/input'
import { Membership, MembershipMotors } from '@utils/interfaces'
import { IProvider } from '@modules/admin/modules/providers/interfaces'

interface IProps {
  values: Membership
  providers: IProvider[]
  err: FormikErrors<Membership>
}

const FieldArrayMotors = ({ values, providers, err }: IProps) => (
  <FieldArray
    name="services"
    render={(arrayHelpers) => (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm my-6 px-5"
          onClick={() =>
            arrayHelpers.push({
              provider: '',
              service: '',
              dsto: '',
            })
          }
        >
          Agregar nuevo motor
        </button>
        <div className="">
          {err.services && typeof err.services === 'string' && (
            <span className="text-xs mt-3 text-red-500 block">
              * {err.services}
            </span>
          )}
        </div>
        <div className="">
          {values.services &&
            values.services.length > 0 &&
            values.services.map((motor: MembershipMotors, i: number) => (
              <div key={i}>
                <span className="text-sm">Motor {i + 1}</span>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <InputForm
                      as="select"
                      name={`services[${i}].provider`}
                      className="select"
                    >
                      <option value="">Selecciona un motor</option>
                      {providers.map(({ name, id }, j) => (
                        <option key={j} value={id}>
                          {name}
                        </option>
                      ))}
                    </InputForm>
                    {i > 0 && (
                      <div
                        className="tooltip tooltip-left"
                        data-tip="Eliminar motor"
                      >
                        <button
                          type="button"
                          className="btn btn-ghost border border-primary"
                          onClick={() => arrayHelpers.remove(i)}
                        >
                          -
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    {motor.provider && providers && (
                      <div className="flex gap-2">
                        <InputForm as="select" name={`services[${i}].service`}>
                          <option value="" disabled>
                            selecciona un servicio
                          </option>
                          {providers
                            .filter(({ id }) => motor.provider === id)
                            .map(({ services }) =>
                              services.map((service, j) => (
                                <option key={j} value={JSON.stringify(service)}>
                                  {service.name}
                                </option>
                              ))
                            )}
                        </InputForm>
                        <InputForm
                          name={`services[${i}].dsto`}
                          placeholder="% dsto"
                          autoComplete="off"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
  />
)

export default FieldArrayMotors

import { Field, FieldArray } from 'formik'
import { IProvider } from '@admin/modules/providers/interfaces'
import { InputForm } from '@utils/components'
import { SERVICES } from '@helpers/services'

export const ProviderService = ({ values }: { values: IProvider }) => (
  <FieldArray
    name="services"
    render={(helper) => (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm my-6 px-5"
          onClick={() =>
            helper.push({
              id: '1',
              name: '',
              state: true,
              profit: '',
            })
          }
        >
          Agregar nuevo servicio
        </button>

        <div className="flex flex-wrap gap-4 mt-5">
          {values.services &&
            values.services.length > 0 &&
            values.services.map((_: unknown, i: number) => (
              <div
                key={i}
                className="w-full md:w-[48%] rounded-lg p-5 shadow-xl bg-base-100"
              >
                <div className="flex gap-4 items-center">
                  <div className="form-control mt-4">
                    <label className="label cursor-pointer flex justify-start gap-3">
                      <span className="label-text">Habilitar</span>
                      <Field
                        type="checkbox"
                        className="toggle toggle-primary"
                        name={`services[${i}].state`}
                      />
                    </label>
                  </div>

                  <InputForm
                    name={`services[${i}].profit`}
                    text="% Ganancia"
                    placeholder="% max. ganancia."
                    className="input-sm"
                    labelClassName="text-xs"
                  />
                </div>

                <div className="flex gap-4 items-center">
                  <InputForm
                    name={`services[${i}].name`}
                    as="select"
                    className="select-sm"
                  >
                    <option value="" disabled>
                      Seleccionar servicio
                    </option>
                    {SERVICES.map((service, j) => (
                      <option value={service} key={j}>
                        {service}
                      </option>
                    ))}
                  </InputForm>
                  <div className="tooltip" data-tip="Eliminar servicio">
                    <i
                      className="fa-solid fa-circle-xmark cursor-pointer 
                            text-primary text-xl"
                      onClick={() =>
                        values.services.length > 1 && helper.remove(i)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
  />
)

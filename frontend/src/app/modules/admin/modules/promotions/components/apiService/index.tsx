import { PromoAdmin } from '@admin/modules/promotions/interfaces'
import { IProvider } from '@modules/admin/modules/providers/interfaces'
import { InputForm } from '@utils/components'
import { FieldArray, FormikErrors } from 'formik'
import { PromoServices } from './services'

interface IProps {
  values: PromoAdmin
  providers?: IProvider[]
  errors: FormikErrors<PromoAdmin>
}

export const ApiServiceField = ({ values, providers, errors }: IProps) => (
  <div>
    {values.dynamic && (
      <FieldArray
        name="informationApi"
        render={(helper) => (
          <div className="form-control mt-4">
            <button
              title="nuevo motor"
              type="button"
              className="btn btn-xs btn-primary w-fit"
              onClick={() =>
                helper.push({
                  id: '',
                  services: [],
                })
              }
            >
              Agregar motor
            </button>

            <div>
              {errors &&
                errors.informationApi &&
                typeof errors.informationApi === 'string' && (
                  <div className="mt-3 text-xs text-red-500">
                    <strong>* </strong>
                    <span>{errors.informationApi}</span>
                  </div>
                )}
            </div>

            <div className="mt-4">
              {values.informationApi &&
                values.informationApi.length > 0 &&
                values.informationApi.map((item, index) => (
                  <div
                    key={index}
                    className="collapse mt-3 shadow border bg-base-100 rounded-xl"
                  >
                    <input aria-label="Search" type="checkbox" />
                    <div className="collapse-title">
                      <span className="mt-2 text-xs ml-1 px-2">
                        Motor {index + 1}
                      </span>
                    </div>

                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <div className="flex gap-4 justify-between">
                          <InputForm
                            name={`informationApi[${index}].id`}
                            as="select"
                            className="select select-xs select-primary"
                          >
                            <option value="">Selecciona un proveedor</option>
                            {providers &&
                              providers.map((provider, index) => (
                                <option key={index} value={provider.id}>
                                  {provider.name}
                                </option>
                              ))}
                          </InputForm>

                          <button
                            title="Eliminar servicio"
                            type="button"
                            className="btn btn-xs btn-primary btn-circle mt-3"
                            onClick={() => helper.remove(index)}
                          >
                            <i className="fa-solid fa-minus text-sm" />
                          </button>
                        </div>

                        {item.id && (
                          <div className="mt-4">
                            <PromoServices
                              provider={item}
                              indexApi={index}
                              errors={errors}
                              services={
                                providers?.find((prov) => prov.id === item.id)
                                  ?.services
                              }
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
    )}
  </div>
)

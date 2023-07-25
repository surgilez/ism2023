import { FieldArray, FormikErrors } from 'formik'
import { PromoAdmin, PromoApi } from '@admin/modules/promotions/interfaces'
import { IProviderService } from '@admin/modules/providers/interfaces'
import { InputForm } from '@utils/components'
import { HotelServicePromo } from './hotel'

interface IProps {
  provider: PromoApi
  indexApi: number
  services?: IProviderService[]
  errors: FormikErrors<PromoAdmin>
}

export const PromoServices = ({
  provider,
  indexApi,
  services,
  errors,
}: IProps) => (
  <FieldArray
    name={`informationApi[${indexApi}].services`}
    render={(helper) => (
      <div className="form-control mt-4">
        <button
          title="nuevo servicio"
          type="button"
          className="btn btn-xs btn-primary w-fit"
          onClick={() =>
            helper.push({
              id: '',
              data: [],
            })
          }
        >
          Agregar servicio
        </button>

        <div>
          {errors.informationApi &&
            errors.informationApi[indexApi] &&
            (errors.informationApi[indexApi] as any).services &&
            typeof (errors.informationApi[indexApi] as any).services ===
              'string' && (
              <div className="mt-3 text-red-500 text-xs">
                <strong>* </strong>
                <span>{(errors.informationApi[indexApi] as any).services}</span>
              </div>
            )}
        </div>

        <div className="mt-4">
          {provider.services &&
            provider.services.length > 0 &&
            provider.services.map((service, indexServ) => (
              <div
                key={indexServ}
                className="collapse mt-3 shadow bg-[#E5E4C2] rounded-xl"
              >
                <input aria-label="Search" type="checkbox" />
                <div className="collapse-title">
                  <span className="mt-2 text-xs ml-1">
                    Servicio {indexServ + 1}
                  </span>
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col">
                    <div className="flex gap-4 justify-between">
                      <InputForm
                        name={`informationApi[${indexApi}].services[${indexServ}].id`}
                        as="select"
                        className="select select-xs select-primary"
                      >
                        <option value="">Selecciona un servicio</option>
                        {services &&
                          services.map((serv, index) => (
                            <option key={index} value={JSON.stringify(serv)}>
                              {serv.name}
                            </option>
                          ))}
                      </InputForm>

                      <button
                        title="Eliminar servicio"
                        type="button"
                        className="btn btn-xs btn-primary btn-circle mt-3"
                        onClick={() => {
                          if (indexServ > 0) {
                            helper.remove(indexServ)
                          }
                        }}
                      >
                        <i className="fa-solid fa-minus text-sm" />
                      </button>
                    </div>
                    <div>
                      <HotelServicePromo
                        indexApi={indexApi}
                        indexServ={indexServ}
                        service={service}
                        errors={errors}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
  />
)

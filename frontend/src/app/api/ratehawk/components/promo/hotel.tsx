import { InputForm } from '@utils/components'
import {
  IPropsFieldArray,
  PromoAdmin,
} from '@admin/modules/promotions/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { setPromoOpenModal, setPromoModalIndex } from '@redux/actions'
import { useEffect } from 'react'
import { Redux } from '@redux/interfaces/redux'

export const HotelRatehawkPromoService = ({
  helper,
  service,
  indexApi,
  indexServ,
  errors,
}: IPropsFieldArray) => {
  const dispatch = useDispatch()
  const { modal } = useSelector((i: Redux) => i.admin.promo)

  useEffect(() => {
    if (modal && modal.flag === 'cancel' && modal?.index) {
      helper.remove(modal.index - 1)
    }
  }, [modal?.flag])

  useEffect(() => {
    if (modal && modal.data && modal.index) {
      const indexInput = modal.index - 1
      helper.form.setValues((val: PromoAdmin) => ({
        ...val,
        informationApi: val.informationApi
          ? val.informationApi.map((item) => ({
              ...item,
              services: item.services
                ? item.services.map((itemServ) => ({
                    ...itemServ,
                    data: itemServ.data
                      ? itemServ.data.map((itemData, index) => {
                          if (index === indexInput) {
                            return {
                              ...itemData,
                              ...modal.data,
                            }
                          }
                          return itemData
                        })
                      : [],
                  }))
                : [],
            }))
          : [],
      }))
    }
  }, [modal?.data])

  return (
    <div className="form-control mt-4">
      <button
        title="nuevo hotel"
        type="button"
        className="btn btn-xs btn-primary w-fit"
        onClick={() => {
          helper.push({
            id: '',
            name: '',
            dsto: '',
          })

          dispatch(setPromoOpenModal(true, 'add'))
          dispatch(setPromoModalIndex(service.data.length + 1))
        }}
      >
        Agregar hotel
      </button>

      <div>
        {errors.informationApi &&
          errors.informationApi[indexApi] &&
          (errors.informationApi[indexApi] as any).services &&
          (errors.informationApi[indexApi] as any).services[indexServ] &&
          (errors.informationApi[indexApi] as any).services[indexServ].data &&
          typeof (errors.informationApi[indexApi] as any).services[indexServ]
            .data === 'string' && (
            <span className="mt-3 text-red-500 text-xs pl-1 block">
              <strong>* </strong>
              {
                (errors.informationApi[indexApi] as any).services[indexServ]
                  .data
              }
            </span>
          )}
      </div>

      <div className="mt-4">
        {service.data &&
          service.data.length > 0 &&
          service.data.map((_, indexHotel) => (
            <div key={indexHotel} className="flex flex-col">
              <span className="mt-2 text-xs ml-1">Hotel {indexHotel + 1}</span>
              <div className="flex gap-2">
                <InputForm
                  name={`informationApi[${indexApi}].services[${indexServ}].data[${indexHotel}].name`}
                  placeholder="Hotel Name"
                  className="input-xs"
                  onKeyDown={(ev: any) => ev.preventDefault()}
                />
                <div className="w-[100px]">
                  <InputForm
                    name={`informationApi[${indexApi}].services[${indexServ}].data[${indexHotel}].dsto`}
                    placeholder="% dsto"
                    className="input-xs"
                    autoComplete="off"
                  />
                </div>
                <button
                  title="Eliminar hotel"
                  type="button"
                  className="btn btn-xs btn-primary btn-circle mt-2"
                  onClick={() => helper.remove(indexHotel)}
                >
                  <i className="fa-solid fa-minus text-sm" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

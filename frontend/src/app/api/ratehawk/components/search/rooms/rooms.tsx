/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react'
import { IHotelRatehawk } from '@api/ratehawk/interface/multicomplete'
import { InputForm } from '@utils/components'
import { FieldArray, FormikErrors } from 'formik'

interface IProps {
  values: IHotelRatehawk
  setFocused: Dispatch<SetStateAction<boolean>>
  setValues: (
    values: SetStateAction<IHotelRatehawk>,
    shouldValidate?: boolean | undefined
  ) => void
  errors: FormikErrors<IHotelRatehawk>
}

export const RoomsGuests = ({
  values,
  setFocused,
  setValues,
  errors,
}: IProps) => (
  <div>
    <h3 className="text-xl mt-2 mb-8 text-center">Configurar habitaciones</h3>
    <FieldArray
      name="guests"
      render={(helper) => (
        <>
          {values.guests &&
            values.guests.length > 0 &&
            values.guests.map(({ children }: any, i) => (
              <div key={i} className="my-10">
                <hr className={`my-3 ${i > 0 ? 'block' : 'hidden'}`} />
                <div className="flex justify-between mb-2">
                  <div
                    className={`w-full ${
                      values.guests.length > 1 ? 'block' : 'hidden'
                    }`}
                  >
                    <span> Habitación {i + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={`text-sm cursor-pointer ${
                        values.guests.length > 1 ? 'block' : 'hidden'
                      }`}
                      onClick={() =>
                        values.guests.length > 1 && helper.remove(i)
                      }
                    >
                      Eliminar
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="!w-[120px] mr-4">
                    <span className="text-sm">Adultos</span>
                    <InputForm
                      name={`guests[${i}].adults`}
                      type="number"
                      min={1}
                      max={6}
                      className="input input-sm bg-transparent"
                    />
                  </div>
                  <div>
                    <span className="text-sm">Niños</span>
                    <FieldArray
                      name={`guests[${i}].children`}
                      render={(helperChildren) => (
                        <div className="flex gap-2 flex-wrap ">
                          {children &&
                            children.map((_: any, j: number) => (
                              <div
                                key={j}
                                className="w-[190px] 2xl:w-[300px] flex items-center justify-between gap-2"
                              >
                                <InputForm
                                  name={`guests[${i}].children[${j}]`}
                                  as="select"
                                  className="select select-sm"
                                >
                                  <option value="">Selecciona la edad</option>
                                  {new Array(18)
                                    .fill({})
                                    .map((__: unknown, l) => (
                                      <option key={l} value={l}>
                                        {l} {l === 1 ? 'año' : 'años'}
                                      </option>
                                    ))}
                                </InputForm>
                                <button
                                  title="Eliminar"
                                  type="button"
                                  className="btn btn-sm btn-primary"
                                  onClick={() => helperChildren.remove(j)}
                                >
                                  <i className="fa-solid fa-minus" />
                                </button>
                              </div>
                            ))}
                          <button
                            title="Agregar"
                            type="button"
                            className={`btn btn-primary mt-2 btn-sm ${
                              children.length >= 4 && 'hidden'
                            }`}
                            onClick={() => {
                              if (children.length < 4) {
                                helperChildren.push('')
                              }
                            }}
                          >
                            {children.length <= 0 ? (
                              <span>Agregar un niño</span>
                            ) : (
                              <i className="fa-solid fa-plus text-sm" />
                            )}
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          <div className="flex flex-col md:flex-row gap-2 justify-between mt-5">
            <button
              title="Agregar habitación"
              type="button"
              className="btn w-full md:w-[48%]"
              onClick={() =>
                helper.push({
                  adults: 1,
                  children: [],
                })
              }
            >
              <span>Nueva habitación</span>
            </button>

            <button
              title="finalizar configuración"
              type="button"
              className="btn btn-primary w-full md:w-[48%]"
              onClick={() => {
                if (!errors.guests) {
                  setFocused(false)
                  const rooms = values.guests.length
                  let adults = 0
                  let children = 0
                  values.guests.forEach(
                    (item: { adults: number; children: string | any[] }) => {
                      adults += item.adults
                      children += item.children.length
                    }
                  )

                  setValues((val: any) => ({
                    ...val,
                    info: {
                      rooms,
                      people: adults + children,
                    },
                  }))
                }
              }}
            >
              Terminar
            </button>
          </div>
        </>
      )}
    />
  </div>
)

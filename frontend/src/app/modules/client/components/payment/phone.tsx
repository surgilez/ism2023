import { IPayment } from '@modules/client/interface'
import { InputForm } from '@utils/components'
import { FieldArray, FormikErrors } from 'formik'
import { SetStateAction } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'

interface IProps {
  setValues: (
    values: SetStateAction<IPayment>,
    shouldValidate?: boolean | undefined
  ) => void
  values: IPayment
  errors: FormikErrors<IPayment>
}

export const PhoneDetail = ({ setValues, values, errors }: IProps) => (
  <div className="w-full mt-10">
    <span className="text-[#14E8C8] font-bold text-md">
      ¿A QUE NÚMERO PODEMOS LLAMARTE?
    </span>
    <span className="text-xs block w-[70%] mt-4">
      El número de teléfono es fundamental para que gestiones tu reserva.
    </span>

    <div className="mt-10 flex flex-col gap-4">
      <FieldArray
        name="extra.phone"
        render={(helper) => (
          <div>
            {values.extra.phone.map((_, index) => (
              <div key={index} className="mt-10 flex flex-col gap-4">
                <div className="flex gap-4">
                  <InputForm
                    name={`extra.phone.[${index}].typePhone`}
                    text="Tipo de teléfono"
                    className="select-sm bg-transparent"
                    placeholder="Tipo de teléfono"
                    as="select"
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="MOBILE" className="text-black">
                      Teléfono móvil
                    </option>
                    <option value="HOME" className="text-black">
                      Teléfono fijo
                    </option>
                  </InputForm>

                  <div className="text-black mt-7">
                    <PhoneInput
                      country={'ec'}
                      enableSearch={true}
                      value={`extra.phone.[${index}].number`}
                      containerClass="!bg-transparent"
                      inputClass="!bg-transparent !input-sm !border-1 !border-primary !text-white !p-0 !pl-10"
                      onChange={(phone) => {
                        setValues((val) => ({
                          ...val,
                          extra: {
                            ...val.extra,
                            phone: val.extra.phone.map((item, j) =>
                              index === j ? { ...item, number: phone } : item
                            ),
                          },
                        }))
                      }}
                    />
                    <span className="block mt-2 text-red-500">
                      {errors.extra &&
                        errors.extra.phone &&
                        errors.extra.phone[index] &&
                        (errors.extra.phone[index] as any).number}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <span
                className="mt-5 text-secondary font-bold cursor-pointer flex gap-4 items-center"
                onClick={() =>
                  helper.push({
                    number: '',
                    typePhone: 'MOBILE',
                  })
                }
              >
                <i className="fa-solid fa-plus" /> Agregar otro teléfono
              </span>
              <span
                className="mt-5 text-secondary font-bold cursor-pointer flex gap-4 items-center"
                onClick={() => values.extra.phone.length !== 1 && helper.pop()}
              >
                <i className="fa-solid fa-minus" />
                Eliminar último teléfono registrado
              </span>
            </div>
          </div>
        )}
      />
    </div>
  </div>
)

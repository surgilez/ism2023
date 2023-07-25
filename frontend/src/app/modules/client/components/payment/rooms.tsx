import { IPayment } from '@modules/client/interface'
import { InputForm } from '@utils/components'
import { FieldArray } from 'formik'

interface IProps {
  values: IPayment
}

export const GuestsDetails = ({ values }: IProps) => {
  return (
    <div className="w-full mt-10">
      <span className="text-[#14E8C8] font-bold text-md">¿QUIENES VIAJAN?</span>
      <span className="text-xs block w-[70%] mt-4">
        Solicitamos incluir los nombres de quienes viajan para ofrecerte una
        mejor experiencia de usuario
      </span>

      <FieldArray
        name="extra.rooms[0].guests"
        render={(helper) => (
          <div>
            {values.extra.rooms[0].guests.map((_, index) => (
              <div key={index} className="mt-10 flex flex-col gap-4">
                <div className="flex gap-4">
                  <InputForm
                    name={`extra.rooms[0].guests.[${index}].first_name`}
                    text="Nombre"
                    className="input-sm bg-transparent"
                    placeholder="Nombre"
                  />
                  <InputForm
                    name={`extra.rooms[0].guests.[${index}].last_name`}
                    text="Segundo nombre"
                    className="input-sm bg-transparent"
                    placeholder="Opcional"
                  />
                  <button
                    title="Eliminar"
                    type="button"
                    className="btn btn-secondary btn-sm mt-6"
                    onClick={() => index !== 0 && helper.remove(index)}
                  >
                    <i className="fa-solid fa-minus" />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4">
              <span
                className="mt-5 text-secondary font-bold cursor-pointer flex gap-4 items-center"
                onClick={() =>
                  helper.push({
                    first_name: '',
                    last_name: '',
                  })
                }
              >
                <i className="fa-solid fa-plus" /> Agregar persona
              </span>
            </div>
          </div>
        )}
      />
    </div>
  )
}

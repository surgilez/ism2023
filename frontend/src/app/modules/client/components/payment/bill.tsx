import { InputForm } from '@utils/components'

export const BillDetailPayment = () => (
  <div className="w-full mt-10">
    <span className="text-[#14E8C8] font-bold text-md">
      ¿A NOMBRE DE QUIEN EMITIMOS TU FACTURA?
    </span>

    <div className="mt-10 flex flex-col gap-4">
      <div className="flex gap-4">
        <InputForm
          name="extra.bill.name"
          text="Nombre"
          className="input-sm bg-transparent"
          placeholder="Nombre"
        />
        <InputForm
          name="extra.bill.secondName"
          text="Segundo nombre"
          className="input-sm bg-transparent"
          placeholder="Opcional"
        />
      </div>
      <div className="flex gap-4">
        <InputForm
          name="extra.bill.lastName"
          text="Apellido"
          className="input-sm bg-transparent"
          placeholder="Apellido"
        />
        <InputForm
          name="extra.bill.email"
          text="Email"
          className="input-sm bg-transparent"
          placeholder="Email"
        />
      </div>
      <div className="flex gap-4">
        <InputForm
          name="extra.bill.identificationDocType"
          text="Tipo de documento"
          className="select-sm bg-transparent"
          placeholder="Tipo Identificación"
          as="select"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="IDCARD" className="text-black">
            Cédula
          </option>
          <option value="PASSPORT" className="text-black">
            Pasaporte
          </option>
        </InputForm>
        <InputForm
          name="extra.bill.identificationDocId"
          text="Identificación"
          className="input-sm bg-transparent"
          placeholder="Identificación"
        />
      </div>
    </div>
  </div>
)

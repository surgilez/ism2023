import { InputForm } from '@utils/components'
import { Field } from 'formik'

export const VoucherDetail = () => (
  <div className="w-full mt-10">
    <span className="text-[#14E8C8] font-bold text-md block">
      ¿A DONDE ENVIAMOS TU VOUCHER?
    </span>
    <span className="text-xs block w-[70%] mt-4">
      El email que elijas será fundamental para que gestiones tu reserva y
      recibas información importante sobre tu viaje
    </span>

    <div className="mt-10 flex flex-col gap-4">
      <div className="flex gap-4">
        <InputForm
          name="extra.voucher.email"
          text="Email"
          className="input-sm bg-transparent"
          placeholder="example@mail.com"
        />
      </div>
      <div className="flex gap-4">
        <InputForm
          name="extra.voucher.confirmEmail"
          text="Confirma tu email"
          className="input-sm bg-transparent"
          placeholder="example@mail.com"
        />
      </div>
      <div className="flex gap-4">
        <div className="form-control mt-4">
          <label className="label cursor-pointer flex justify-start gap-3">
            <Field
              type="checkbox"
              className="toggle toggle-primary"
              name="extra.voucher.offer"
              tabIndex={-1}
            />
            <span className="text-sm">Quiero recibir mejores ofertas</span>
          </label>
        </div>
      </div>
    </div>
  </div>
)

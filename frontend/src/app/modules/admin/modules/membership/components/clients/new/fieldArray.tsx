import { FieldArray, FormikErrors } from 'formik'
import { InputForm } from '@utils/components'
import { Client, Membership } from '@utils/interfaces'

interface IProps {
  values: Client
  membershipList?: Membership[]
  errors: FormikErrors<Client>
}

const FieldArrayMembership = ({ values, membershipList, errors }: IProps) => (
  <FieldArray
    name="membershipInfo"
    render={(arrayHelpers) => (
      <div className="w-full">
        <button
          type="button"
          className="btn btn-primary btn-sm my-5 px-5"
          onClick={() =>
            arrayHelpers.push({
              id: '',
              name: '',
            })
          }
        >
          Agregar nueva membresía
        </button>

        {errors.membershipInfo && typeof errors.membershipInfo === 'string' && (
          <span className="text-xs text-red-500 block">
            * {errors.membershipInfo}
          </span>
        )}

        {values.membershipInfo &&
          values.membershipInfo.length > 0 &&
          values.membershipInfo.map((val: any, i: number) => {
            const name = val?.name.toLowerCase()

            if (val.id && val.id.length === 25 && membershipList) {
              const membership = membershipList.find(({ id }) => id === val.id)
              val.id = JSON.stringify(membership)
            }

            return (
              name !== 's/n' && (
                <div
                  key={i}
                  className="flex justify-between gap-2 mt-2 items-center"
                >
                  <InputForm
                    name={`membershipInfo[${i}].id`}
                    as="select"
                    text="Membresía"
                    className="select-sm"
                    autoComplete="off"
                  >
                    <option value="" disabled>
                      Seleccionar membresía
                    </option>
                    {membershipList?.map(
                      (membership, i) =>
                        membership.state &&
                        membership.name?.toLocaleLowerCase() !== 's/n' && (
                          <option key={i} value={JSON.stringify(membership)}>
                            {membership.name}
                          </option>
                        )
                    )}
                  </InputForm>

                  <div
                    className="tooltip mt-6 tooltip-left"
                    data-tip="Eliminar membresía"
                  >
                    <button
                      title="Eliminar membresía"
                      type="button"
                      className="btn btn-circle btn-outline btn-primary btn-sm"
                      onClick={() => arrayHelpers.remove(i)}
                    >
                      <i className="fa-solid fa-minus" />
                    </button>
                  </div>
                </div>
              )
            )
          })}
      </div>
    )}
  />
)

export default FieldArrayMembership

import { Field } from 'formik'

interface IProps {
  groupName: string
  value: string
  [x: string]: any
  checkedName?: string
  isInput?: boolean
  label?: string
  classNameLabel?: string
}

export const RadioSelect = ({
  groupName,
  value,
  checkedName,
  isInput = false,
  label,
  classNameLabel,
  ...rest
}: IProps) => (
  <label className="flex flex-row">
    {isInput ? (
      <input
        type="radio"
        name={groupName}
        checked={value === checkedName}
        value={value}
        className="radio checked:bg-black radio-xs md:radio-sm"
        {...rest}
      />
    ) : (
      <Field
        type="radio"
        name={groupName}
        checked={value === checkedName}
        value={value}
        className="radio checked:bg-blue-500 radio-xs md:radio-sm input-primary"
        {...rest}
      />
    )}
    <span
      className={`mx-3 cursor-pointer text-sm md:text-base ${classNameLabel}`}
    >
      {label}
    </span>
  </label>
)

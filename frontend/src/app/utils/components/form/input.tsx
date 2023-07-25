import { Field, FieldProps } from 'formik'
import { ReactNode } from 'react'
import { ErrorMessageInput } from './error'

export const InputForm = ({
  name,
  text,
  type = 'text',
  as,
  placeholder,
  children,
  className,
  labelClassName,
  textLabelClassName,
  ...rest
}: {
  name: string
  text?: string
  as?: string
  type?: string
  placeholder?: string
  children?: ReactNode | ((props: FieldProps) => ReactNode)
  className?: string
  labelClassName?: string
  textLabelClassName?: string
  [res: string]: unknown
}) => (
  <label className={`w-full ${labelClassName}`}>
    <span className={`block text-sm mb-2 ${textLabelClassName}`}>{text}</span>
    <Field
      type={type}
      as={as}
      placeholder={placeholder}
      className={`input input-base input-bordered input-primary w-full ${className}`}
      name={name}
      {...rest}
    >
      {children}
    </Field>
    <div className="mt-2">
      <ErrorMessageInput name={name} />
    </div>
  </label>
)

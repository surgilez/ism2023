import { ErrorMessage } from 'formik'

export const ErrorMessageInput = ({ name }: { name: string }) => (
  <ErrorMessage name={name} component="div" className="text-xs text-red-500" />
)

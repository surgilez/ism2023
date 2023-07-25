/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from 'react'

export const useForm = <T>(init: T) => {
  const [valueForm, setValueForm] = useState(init)

  const reset = () => setValueForm(init)

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, type, checked, files, name } = ev.target
    let val: any = value

    switch (type) {
      case 'checkbox':
        val = checked
        break
      case 'file':
        val = files
        break
      default:
    }

    setValueForm((prev) => ({
      ...prev,
      [name]: val,
    }))
  }

  const handleEmoticonInputEnter = (message: string) => {
    setValueForm((prev) => ({ ...prev, message }))
  }

  return {
    valueForm,
    ...valueForm,
    setValueForm,
    reset,
    handleInputChange,
    handleEmoticonInputEnter,
  }
}

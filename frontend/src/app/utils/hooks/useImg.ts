/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react'
import Swal from 'sweetalert2'

export const useImgInput = ({
  refImg,
  inputImgRef,
}: {
  refImg: any
  inputImgRef: any
}) => {
  const handleOpenInputImg = () => {
    const item = inputImgRef.current
    item?.click()
  }

  const handleChangeImg = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const { files } = e.currentTarget

    if (!files) return
    const img = files[0]

    if (!img.type.includes('image')) {
      return Swal.fire({
        title: 'Formato invalido',
        text: 'El archivo seleccionado no es una imagen válida',
        icon: 'error',
      })
    }

    const reader = new FileReader()

    if (img) {
      reader.readAsDataURL(img)
    }

    const avatarImg = refImg.current

    if (avatarImg) {
      reader.onload = () => {
        if (reader.result) avatarImg.src = reader.result.toString()
      }
    }

    setFieldValue('img', img, false)
  }

  return {
    handleChangeImg,
    handleOpenInputImg,
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import {
  setListMembershipSelect,
  setResetMembershipReport,
} from '@redux/actions'
import xlsx, { IJsonSheet } from 'json-as-xlsx'
import Swal from 'sweetalert2'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCheckList } from '@utils/hooks/useCheckList'

export const useReports = () => {
  const dispatch = useDispatch()

  const { membershipList, selectReset, select } = useSelector(
    (i: Redux) => i.admin.reports
  )

  const {
    checkList,
    handleChangeMain,
    handleChange,
    isCheckedAll,
    resetCheckList,
    resetCheckAll,
  } = useCheckList(membershipList || [])

  useEffect(() => {
    dispatch(setListMembershipSelect([...checkList] as string[]))
  }, [dispatch, checkList])

  useEffect(() => {
    if (selectReset) {
      resetCheckList()
      dispatch(setResetMembershipReport(false))
    }
  }, [selectReset, dispatch])

  const handleDownload = () => {
    if (!membershipList) return
    if (!select || select.length <= 0)
      return Swal.fire(
        'Error al realizar la descarga',
        'Debes seleccionar los datos de la lista',
        'error'
      )

    const data: IJsonSheet[] = [
      {
        sheet: 'membresias',
        columns: [
          {
            label: 'ID Cliente',
            value: 'id',
          },
          {
            label: 'Nombre',
            value: 'name',
          },
          {
            label: 'Apellido',
            value: 'lastName',
          },
          {
            label: 'Documento',
            value: 'doc',
          },
          {
            label: 'Correo',
            value: 'email',
          },
        ],
        content: [],
      },
      {
        sheet: 'ventas',
        columns: [
          {
            label: 'ID Cliente',
            value: 'client',
          },
          {
            label: 'ID Venta',
            value: 'id',
          },
          {
            label: 'Nombre',
            value: 'name',
          },
          {
            label: 'Detalle',
            value: 'detail',
          },
          {
            label: 'CheckIn',
            value: 'checkin',
          },
          {
            label: 'CheckOut',
            value: 'checkout',
          },
          {
            label: 'Precio',
            value: 'price',
            format: '$0.00',
          },
        ],
        content: [],
      },
    ]

    select.forEach((item: any) => {
      const { name, lastName, doc, id, email, sales } = JSON.parse(item)

      data[0].content.push({
        name: name || '',
        lastName: lastName || '',
        doc: doc || '',
        id: id || '',
        email: email || '',
      })

      sales?.forEach(
        ({ id: idSale, detail, name, price, checkin, checkout }: any) => {
          data[1].content.push({
            client: id || '',
            id: idSale || '',
            name: name || '',
            detail: detail || '',
            price: price || '',
            checkin: checkin || '',
            checkout: checkout || '',
          })
        }
      )
    })

    const settings = {
      fileName: 'membershipReport',
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {},
    }

    xlsx(data, settings)

    resetCheckList()
    resetCheckAll()
    dispatch(setResetMembershipReport(false))
  }

  return {
    handleDownload,
    membershipList,
    isCheckedAll,
    handleChangeMain,
    handleChange,
    checkList,
  }
}

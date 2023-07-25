/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { setListSalesSelect, setResetSalespReport } from '@redux/actions'
import xlsx, { IJsonSheet } from 'json-as-xlsx'
import Swal from 'sweetalert2'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCheckList } from '@utils/hooks/useCheckList'

export const useSales = () => {
  const dispatch = useDispatch()

  const { salesList, selectResetSales, selectSales } = useSelector(
    (i: Redux) => i.admin.reports
  )

  const {
    checkList,
    handleChangeMain,
    handleChange,
    isCheckedAll,
    resetCheckList,
    resetCheckAll,
  } = useCheckList(salesList || [])

  useEffect(() => {
    dispatch(setListSalesSelect([...checkList] as string[]))
  }, [dispatch, checkList])

  useEffect(() => {
    if (selectResetSales) {
      resetCheckList()
      dispatch(setResetSalespReport(false))
    }
  }, [selectResetSales, dispatch])

  const handleDownload = () => {
    if (!salesList) return
    if (!selectSales || selectSales.length <= 0)
      return Swal.fire(
        'Error al realizar la descarga',
        'Debes seleccionar los datos de la lista',
        'error'
      )

    const data: IJsonSheet[] = [
      {
        sheet: 'ventas',
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
          {
            label: 'Num Membresía',
            value: 'numMembership',
          },
        ],
        content: [],
      },
    ]

    selectSales.forEach((item: any) => {
      const { name, lastName, doc, id, email, numMembership } = JSON.parse(item)

      data[0].content.push({
        name,
        lastName,
        doc,
        id,
        email,
        numMembership,
      })
    })

    const settings = {
      fileName: 'salesReport',
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {},
    }

    xlsx(data, settings)

    resetCheckList()
    resetCheckAll()
    dispatch(setResetSalespReport(false))
  }

  return {
    handleDownload,
    salesList,
    isCheckedAll,
    handleChangeMain,
    handleChange,
    checkList,
  }
}

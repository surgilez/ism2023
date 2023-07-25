import { ComponentLoader } from '@utils/components'
import { useState } from 'react'
import { useReports } from '../../hooks/useReports'
import { ModalSales } from './sales'
import { Sales } from '../../interfaces/membership'

export const ListReportMembership = () => {
  const {
    membershipList,
    handleDownload,
    isCheckedAll,
    handleChangeMain,
    handleChange,
    checkList,
  } = useReports()
  const promiseInProgress = false

  const [sale, setModalSale] = useState<{
    isOpen: boolean
    sales: Sales[]
  }>({
    isOpen: false,
    sales: [],
  })

  const showSale = (sales?: Sales[]) =>
    setModalSale({
      isOpen: true,
      sales: sales || [],
    })

  return (
    <div>
      {promiseInProgress ? (
        <div className="min-h-[60vh] grid place-content-center">
          <ComponentLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div
            className={`max-h-[600px] mt-10 overflow-auto scroll_list ${
              !promiseInProgress && 'bg-gradient-banner'
            }`}
          >
            <div className="table-container">
              {membershipList && membershipList?.length > 0 ? (
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th>
                        <input
                          title="Check all"
                          type="checkbox"
                          onChange={handleChangeMain}
                          checked={isCheckedAll}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                      </th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Documento</th>
                      <th>Correo</th>
                      <th>Ventas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membershipList?.map((membership, i) => {
                      const { name, lastName, doc, email, sales } = membership
                      return (
                        <tr key={i}>
                          <td>
                            <input
                              title="Seleccionar"
                              type="checkbox"
                              className="checkbox checkbox-sm checkbox-primary"
                              onChange={handleChange}
                              value={JSON.stringify({
                                ...membership,
                                index: i,
                              })}
                              checked={checkList.has(
                                JSON.stringify({ ...membership, index: i })
                              )}
                            />
                          </td>
                          <td>{name}</td>
                          <td>{lastName}</td>
                          <td>{doc}</td>
                          <td>{email}</td>
                          <td className="">
                            {sales && sales.length > 0 ? (
                              <i
                                className="fa-solid fa-tag  cursor-pointer"
                                onClick={() => showSale(sales)}
                              />
                            ) : (
                              <span className="text-xs">S/N</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="h-full grid place-content-center min-h-[50vh]">
                  <h1 className="text-white">No hay resultados</h1>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-center justify-end">
            <button type="button" onClick={handleDownload} className="btn">
              <i className="fa-solid fa-file-export mr-4" />
              <small>Exportar base de datos excel</small>
            </button>
            <ModalSales
              isOpen={sale.isOpen}
              sales={sale.sales}
              setModalSale={setModalSale}
            />
          </div>
        </div>
      )}
    </div>
  )
}

import { ComponentLoader } from '@utils/components'
import { ModalSales } from './sales'
import { Sales } from '@admin/modules/reports/interfaces'
import { usePromiseTracker } from 'react-promise-tracker'
import { useReports } from '@seller/hooks/useReport'
import { useState } from 'react'

export const ListSellerReport = () => {
  const {
    membershipList,
    handleDownload,
    isCheckedAll,
    handleChangeMain,
    handleChange,
    checkList,
  } = useReports()

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

  const { promiseInProgress } = usePromiseTracker({ area: 'reportList' })

  return (
    <div>
      {promiseInProgress ? (
        <div className="min-h-[60vh] grid place-content-center">
          <ComponentLoader bg="bg-primary" />
        </div>
      ) : (
        <div>
          <div
            className={`max-h-[600px] mt-10 overflow-auto scroll_list bg-base-100 rounded-xl`}
          >
            <div>
              {membershipList && membershipList.length > 0 ? (
                <div className="table-container rounded-xl">
                  <table className="table">
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
                      {membershipList?.map((membership) => {
                        const { id, name, lastName, doc, email, sales } =
                          membership
                        return (
                          <tr key={id}>
                            <td>
                              <input
                                title="Check item"
                                type="checkbox"
                                className="checkbox checkbox-sm checkbox-primary"
                                onChange={handleChange}
                                value={JSON.stringify(membership)}
                                checked={checkList.has(
                                  JSON.stringify(membership)
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
                </div>
              ) : (
                <div className="min-h-[60vh] grid place-content-center">
                  <span className="block text-lg text-center text-white">
                    {' '}
                    No existen ventas registradas
                  </span>
                </div>
              )}
            </div>

            <ModalSales
              isOpen={sale.isOpen}
              sales={sale.sales}
              setModalSale={setModalSale}
            />
          </div>
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleDownload}
              className="btn btn-sm"
              disabled={
                promiseInProgress ||
                !membershipList ||
                (membershipList && membershipList.length <= 0)
              }
            >
              <i className="fa-solid fa-file-export mr-3" />
              <small>Exportar base de datos excel</small>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

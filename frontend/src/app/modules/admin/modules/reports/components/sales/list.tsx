import { ComponentLoader } from '@utils/components'
import { Pagination } from '@utils/components/pagination'
import { useSales } from '../../hooks/useSales'

export const ListReportSales = () => {
  const {
    salesList,
    handleDownload,
    isCheckedAll,
    handleChangeMain,
    handleChange,
    checkList,
  } = useSales()
  const promiseInProgress = false

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
                    <th>Nombres</th>
                    <th>Apellido</th>
                    <th>Documento</th>
                    <th>Correo</th>
                    <th>N. Membresía</th>
                  </tr>
                </thead>
                <tbody>
                  {salesList?.map((sales, i) => {
                    const { name, lastName, doc, email, numMembership } = sales
                    return (
                      <tr key={i}>
                        <td>
                          <input
                            title="Seleccionar"
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-primary"
                            onChange={handleChange}
                            value={JSON.stringify(sales)}
                            checked={checkList.has(JSON.stringify(sales))}
                          />
                        </td>
                        <td>{name}</td>
                        <td>{lastName}</td>
                        <td>{doc}</td>
                        <td>{email}</td>
                        <td>{numMembership}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-10 items-center justify-end">
            <button type="button" onClick={handleDownload} className="btn">
              <i className="fa-solid fa-file-export mr-4" />
              <small>Exportar base de datos excel</small>
            </button>
            <Pagination totalReg={92} />
          </div>
        </div>
      )}
    </div>
  )
}

import { SearchReport, ListReportSales } from '../components'

export const SalesReport = () => (
  <>
    <SearchReport type="sales" />
    <div className="mt-5">
      <ListReportSales />
    </div>
  </>
)

import { ListReportMembership, SearchReport } from '../components'

export const MembershipReport = () => (
  <>
    <SearchReport type="membership" />
    <div className="mt-5">
      <ListReportMembership />
    </div>
  </>
)

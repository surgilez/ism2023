import { Routes, Route, Navigate } from 'react-router-dom'
import { ReportLayout } from '@admin/modules/reports/layout'
import { MembershipReport, SalesReport } from '@admin/modules/reports/pages'

export const ReportsRoutes = () => (
  <Routes>
    <Route element={<ReportLayout />}>
      <Route index element={<MembershipReport />} />
      <Route path="sales" element={<SalesReport />} />
      <Route path="*" element={<Navigate to="/admin/report" />} />
    </Route>
  </Routes>
)

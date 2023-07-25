import {
  SearchClientComponent,
  ListClients,
  NewClient,
} from '@admin/modules/membership/components'

export const ClientsScreen = () => (
  <div>
    <SearchClientComponent />
    <div className="my-7">
      <NewClient />
    </div>
    <div className="my-2">
      <ListClients />
    </div>
  </div>
)

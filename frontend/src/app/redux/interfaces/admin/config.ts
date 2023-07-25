import { IEmailConfig } from '@admin/modules/config/interfaces/email'

export interface IConfigState {
  email?: IEmailConfig
}

export interface IConfigAction {
  type: string
  payload: IConfigState
}

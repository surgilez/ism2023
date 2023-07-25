export interface IEmailConfig {
  host: string
  port: number | string
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export type TIdentification = 'IDCARD' | 'PASSPORT'
export type TTypePhone = 'MOBILE' | 'HOME'
export type TStatePayment =
  | 'init'
  | 'processing'
  | 'checkout'
  | 'success'
  | 'error'
  | 'reservation'

export type TCurrency =
  | 'RUB'
  | 'USD'
  | 'EUR'
  | 'RON'
  | 'GBP'
  | 'SGD'
  | 'MYR'
  | 'ZAR'
  | 'PLN'
  | 'AUD'
  | 'RUB'

export type ErrorCreateBooking =
  | 'double_booking_form'
  | 'timeout'
  | 'contract_mismatch'
  | 'duplicate_reservation'
  | 'hotel_not_found'
  | 'insufficient_b2b_balance'
  | 'reservation_is_not_allowed'
  | 'rate_not_found'
  | 'unknown'
  | 'sandbox_restriction'

export interface CustomErrCreateBooking {
  err: ErrorCreateBooking | ErrorCreateBooking[]
  msg?: string
  hashError?: boolean
}

export type TPaymentBooking = 'deposit' | 'now' | 'bank'
export interface Customer {
  givenName: string
  middleName: string
  surname: string
  ip: string
  merchantCustomerId: string
  email: string
  identificationDocType: TIdentification
  identificationDocId: string
  phone: string
}

export interface PaymentTypesBooking {
  amount: string
  currency_code: TCurrency
  is_need_credit_card_data: boolean
  is_need_cvc: boolean
  type: TPaymentBooking
}

export interface NewBooking {
  data: NewBookingData | null
  debug: any | null
  error: ErrorCreateBooking | null
  status: 'ok' | 'error'
}

export interface NewBookingData {
  item_id: number
  order_id: number
  partner_order_id: string
  payment_types: PaymentTypesBooking[]
  upsell_data: any[]
  testMode?: boolean
}

export interface NewBookingFetch {
  data: {
    data: {
      data: NewBookingData | null
      debug: any | null
    }
  }
  headers: any
  status: number
}
export interface Phone {
  typePhone: TTypePhone
  number: string
}

export interface Cart {
  name: string
  description: string
  price: string | number
  quantity: number
}

export interface Shipping {
  street1: string
  country: string
}

export interface Billing extends Shipping {
  postCode: string
}

export interface CustomParameters {
  base0: number
  baseImp: number
  iva: number
}

export interface Guest {
  first_name: string
  last_name: string
}

export interface PaymentType {
  type: TPaymentBooking
  amount: string
  currency_code: TCurrency
  is_need_cvc: boolean
  is_need_credit_card_data: boolean
}

export interface UserBooking {
  email: string
  comment: string
  phone: string
}

export interface PartnerBooking {
  partner_order_id: string
  comment: string
  amount_sell_b2b2c: string
}

export interface RoomsBookingInfo {
  guests: Guest[]
}

export interface FinishBooking {
  user: UserBooking
  partner: PartnerBooking
  language: 'es' | 'en'
  payment_type: PaymentType
  rooms: RoomsBookingInfo[]
}
export interface ExtraInfo extends FinishBooking {
  voucher: {
    email: string
    confirmEmail: string
    offer: boolean
  }

  phone: Phone[]
  bill: {
    name: string
    lastName: string
    email: string
    secondName: string
    identificationDocType: TIdentification
    identificationDocId: string
  }
}

export interface IPayment {
  amount: string | number
  customer: Customer
  merchantTransactionId: string
  acceptConditions?: boolean
  cart?: Cart[]
  shipping?: Shipping
  billing?: Billing
  risk?: string
  customParameters?: CustomParameters
  extra: ExtraInfo
}

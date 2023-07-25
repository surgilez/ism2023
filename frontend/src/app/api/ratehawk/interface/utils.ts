export type TLanguage =
  | 'ar'
  | 'bg'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fr'
  | 'it'
  | 'hu'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sr'
  | 'sq'
  | 'tr'

export type TDestination = 'hotel' | 'region'

export type TRegionSearch = 'Airport' | 'City'

export type THotel =
  | 'Resort'
  | 'Sanatorium'
  | 'Guesthouse'
  | 'Mini-hotel'
  | 'Castle'
  | 'Hotel'
  | 'Boutique_and_Design'
  | 'Apartment'
  | 'Cottages_and_Houses'
  | 'Farm'
  | 'Villas_and_Bungalows'
  | 'Camping'
  | 'Hostel'
  | 'BNB'
  | 'Apart-hotel'

export type TServiceHotel =
  | 'unspecified'
  | 'television'
  | 'towels'
  | 'conditioning'
  | 'housekeeping'
  | 'heating'
  | 'refrigeratior'
  | 'utility'
  | 'safe'
  | 'microwave'
  | 'luggage_storage'
  | 'tour_guide'
  | 'bicycle_rental'
  | 'baby_highchair'
  | 'bed_linen'
  | 'towels_only'
  | 'luggage_storage_apartment'
  | 'luggage_storage_office'

export type TPrice =
  | 'unspecified'
  | 'per_guest_per_night'
  | 'per_guest_per_stay'
  | 'per_room_per_night'
  | 'per_room_per_stay'
  | 'per_hour'
  | 'per_week'

export type TPriceCot =
  | 'unspecified'
  | 'per_guest_per_night'
  | 'per_guest_per_stay'
  | 'per_room_per_night'
  | 'per_room_per_stay'
  | 'per_hour'
  | 'per_week'

export type TPriceMethod = 'unspecified' | 'percent' | 'fixed'

export type TCheckInCheckOutType =
  | 'unspecified'
  | 'early_checkin'
  | 'late_checkout'
  | 'holiday_checkin'
  | 'holiday_checkout'

export type TInclusion = 'unspecified' | 'included' | 'not_included'

export type THability = 'unspecified' | 'available' | 'unavailable'

export type TMeal =
  | 'unspecified'
  | 'all-inclusive'
  | 'breakfast'
  | 'breakfast-buffet'
  | 'continental-breakfast'
  | 'dinner'
  | 'full-board'
  | 'half-board'
  | 'lunch'
  | 'nomeal'
  | 'some-meal'
  | 'english-breakfast'
  | 'american-breakfast'
  | 'asian-breakfast'
  | 'chinese-breakfast'
  | 'israeli-breakfast'
  | 'japanese-breakfast'
  | 'scandinavian-breakfast'
  | 'scottish-breakfast'
  | 'breakfast-for-1'
  | 'breakfast-for-2'
  | 'super-all-inclusive'
  | 'soft-all-inclusive'
  | 'ultra-all-inclusive'
  | 'half-board-lunch'
  | 'half-board-dinner'

export type TDestinationType =
  | 'unspecified'
  | 'airport'
  | 'train'
  | 'ship'
  | 'airport_train'

export type TPaymentType = 'unspecified' | 'cash' | 'card'

export type TPaymentMethod =
  | 'unspecified'
  | 'american_express'
  | 'cash'
  | 'china_unionpay'
  | 'diners_club'
  | 'euro_mastercard'
  | 'jcb'
  | 'maestro'
  | 'mastercard'
  | 'switch_maestro'
  | 'visa'
  | 'visa_debit'
  | 'vise_delta'
  | 'visa_electron'
  | 'pro100'

export type TRegion =
  | 'Airport'
  | 'Bus Station'
  | 'City'
  | 'Continent'
  | 'Country'
  | 'Multi-City (Vicinity)'
  | 'Multi-Region (within a country)'
  | 'Neighborhood'
  | 'Point of Interest'
  | 'Province (State)'
  | 'Railway Station'
  | 'Street'
  | 'Subway (Entrace)'

export type TRating = 0 | 1 | 2 | 3 | 4 | 5

export interface IGuest {
  adults: number
  children: number[]
}

export interface Region {
  country_code: string
  iata: string
  id: number
  name: string
  type: TRegion
}

export interface Tax {
  name: string
  included_by_supplier: boolean
  amount: number
  currency_code: string
}

export interface Vat {
  include: boolean
  value: string
}

export interface CommissionData {
  amount_gross: number
  amount_net: number
  amount_commission: number
}

export interface CommissionInfo {
  show: CommissionData
  charge: CommissionData
}

export interface PerkData {
  charge_price: number
  show_price: number
  time: string
  commission_info: CommissionInfo
}

export interface PerkOption {
  early_checkin: PerkData
  late_checkout: PerkData
}

export interface PolicyData {
  start_at: string | Date
  end_at: string | Date
  amount_charge: number
  amount_show: number
  commission_info: CommissionInfo
}

export interface CancellationPenaltyData {
  free_cancellation_before: string | Date
  policies: PolicyData[]
}

export interface Payment_options {
  payment_types: {
    amount: string
    currency_code: string
    show_amount: number
    show_currency_code: string
    by: string
    is_need_credit_card_data: boolean
    is_need_cvc: boolean
    type: string
    vat_data: Vat
    tax_data: {
      taxes: Tax[]
    }
    perks: PerkOption
    commission_info: CommissionInfo
    cancellation_penalties: CancellationPenaltyData
  }[]
}

export interface RgExt {
  class: number
  quality: number
  sex: number
  bathroom: number
  bedding: number
  family: number
  capacity: number
  club: number
}

export interface SellPriceData {
  min_price: number
  max_price: number
}

export interface DepositData {
  amount: number
  currency_code: string
  is_refundable: string
}

export interface NoShowData {
  amount: number
  currency_code: string
  from_time: string
}

export interface RoomData {
  main_room_type: string
  main_name: string
  bathroom: string
  bedding_type: string
  misc_room_type: string
}

export interface Rates {
  book_hash: string
  match_hash: string
  daily_prices: string[]
  meal: TMeal
  payment_options: Payment_options
  bar_rate_price_data: string | null
  rg_ext: RgExt
  room_name: string
  serp_filters: string[]
  SellPriceData: SellPriceData | null
  allotment: number
  amenities_data: string[]
  any_residency: string | null
  deposit: DepositData | null
  no_show: NoShowData
  room_data_trans: RoomData
}

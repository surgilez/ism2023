import {
  Rates,
  Region,
  RgExt,
  TCheckInCheckOutType,
  TDestinationType,
  THability,
  THotel,
  TInclusion,
  TMeal,
  TPaymentMethod,
  TPaymentType,
  TPrice,
  TPriceCot,
  TPriceMethod,
  TRating,
  TServiceHotel,
} from './utils'

export interface AmenityGroup {
  group_name: string
  amenities: string[]
}

export interface DescriptionItem {
  title: string
  paragraphs: string[]
}

export interface FactsElectricity {
  frequency: number[]
  sockets: string[]
  voltage: number[]
}

export interface Facts {
  electricity: FactsElectricity
  floors_number: number
  rooms_number: number
  year_built: number
  year_renovated: number
}

export interface MetaPolicy {
  currency: string
  price: string | number
}

export interface MetaPolicyExtra extends MetaPolicy {
  inclusion: TInclusion
  price_unit: TPriceCot
}

export interface MetapolicyAddFeeInfo extends MetaPolicy {
  fee_type: TServiceHotel[]
  price_unit: TPrice
}

export interface MetapolicyCheckInCheckOut extends MetaPolicy {
  check_in_check_out_type: TCheckInCheckOutType
  inclusion: TInclusion
}

export interface MetapolicyChildrenInfo extends MetaPolicy {
  age_end: number
  age_start: number
  extra_bed: THability
}

export interface MetapolicyMealInfo extends MetaPolicy {
  inclusion: TInclusion
  meal_type: TMeal
}

export interface MetapolicyChildrenMealInfo extends MetapolicyMealInfo {
  age_end: number
  age_start: number
}

export interface MetaPolicyExtraInfo extends MetaPolicyExtra {
  amount: number
}

export type MetapolicyCotInfo = MetaPolicyExtraInfo

export interface MetapolicyInternetInfo extends MetaPolicyExtra {
  internet_type: 'unspecified' | 'wireless' | 'wired'
  work_area: 'unspecified' | 'hotel' | 'room'
}

export interface MetapolicyDepositInfo extends MetaPolicy {
  availability: THability
  deposit_type: 'unspecified' | 'pet' | 'breakage' | 'keys'
  payment_type: TPaymentType
  price_unit: TPrice
  pricing_method: TPriceMethod
}

export interface MetapolicyNoShowInfo {
  availability: THability
  day_period: 'unspecified' | 'before_midday' | 'after_midday'
  time: string
}

export interface MetapolicyParkingInfo extends MetaPolicyExtra {
  territory_type: 'unspecified' | 'on_side' | 'off_side'
}

export interface MetapolicyPetsInfo extends MetaPolicyExtra {
  pets_type: 'unspecified' | 'gt_5kg' | 'lt_5kg'
}

export interface MetapolicyShuttleInfo extends MetaPolicy {
  inclusion: TInclusion
  destination_type: TDestinationType
  shuttle_type: 'unspecified' | 'one_way' | 'two_ways'
}

export interface MetapolicyVisaInfo {
  visa_support: 'unspecified' | 'support_enable'
}

export interface MetapolicyStructInfo {
  add_fee: MetapolicyAddFeeInfo[]
  check_in_check_out: MetapolicyCheckInCheckOut[]
  children: MetapolicyChildrenInfo[]
  children_meal: MetapolicyChildrenMealInfo[]
  cot: MetapolicyCotInfo[]
  deposit: MetapolicyDepositInfo[]
  extra_bed: MetaPolicyExtraInfo[]
  internet: MetapolicyInternetInfo[]
  meal: MetapolicyMealInfo[]
  no_show: MetapolicyNoShowInfo
  parking: MetapolicyParkingInfo[]
  pets: MetapolicyPetsInfo[]
  shuttle: MetapolicyShuttleInfo[]
  visa: MetapolicyVisaInfo
}

export interface PolicyItem {
  title: string
  paragraphs: string[]
}

export interface RoomGroupNameStruct {
  bathroom: string
  bedding_type: string
  main_name: string
}

export interface RoomGroup {
  name: string
  name_struct: RoomGroupNameStruct
  images: string[]
  room_amenities: string[]
  rg_ext: RgExt
  room_group_id: number // deprecated
}

export interface StarCertificate {
  valid_to: Date | string
  certificate_id: string
}

export interface HotelInfo {
  address: string
  amenity_groups: AmenityGroup[]
  check_in_time: string
  check_out_time: string
  description_struct: DescriptionItem[]
  email: string | null
  facts: Facts
  hotel_chain: string
  id: string
  images: string[]
  is_closed: boolean
  kind: THotel
  latitude: number | string
  longitude: number | string
  name: string
  metapolicy_extra_info: string | null
  metapolicy_struct: MetapolicyStructInfo
  payment_methods: TPaymentMethod[]
  phone: string
  policy_struct: PolicyItem[]
  postal_code: string
  region: Region
  room_groups: RoomGroup
  semantic_version: string // deprecated
  star_certificate: StarCertificate | null
  star_rating: TRating
  serp_filters: string[]
  rates: Rates[]
}

export interface Hotel {
  id: string
  rates: Rates
}

export interface HotelState {
  id?: string
  info?: HotelInfo
  rates?: Rates[]
  type?: 'Client' | 'Seller'
}

export interface HotelAction {
  type: string
  payload?: HotelState
}

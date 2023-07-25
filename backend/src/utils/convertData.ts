import { apiDf } from '@config/env';
import { IPayment } from '@interfaces/IPayment';

export const dataPayment = (data: IPayment): Record<string, string> | undefined | object => {
  const { amount, billing, customParameters, customer, merchantTransactionId, shipping } = data;
  const newData: Record<string, string> = {
    entityId: apiDf.entityId,
    amount,
    currency: 'USD',
    paymentType: 'DB',
    'customer.givenName': customer.givenName,
    'customer.middleName': customer.middleName,
    'customer.surname': customer.surname,
    'customer.ip': customer.ip,
    'customer.merchantCustomerId': customer.merchantCustomerId,
    'customer.email': customer.email,
    'customer.identificationDocType': customer.identificationDocType,
    'customer.identificationDocId': customer.identificationDocId,
    'customer.phone': customer.phone,
    'shipping.street1': shipping.street1,
    'shipping.country': shipping.country,
    'billing.street1': billing.street1,
    'billing.country': billing.country,
    'billing.postcode': billing.postCode,
    testMode: 'EXTERNAL',
    merchantTransactionId,
    'risk.parameters[USER_DATA2]': apiDf.risk,
    'customParameters[SHOPPER_MID]': apiDf.mid,
    'customParameters[SHOPPER_TID]': apiDf.tid,
    'customParameters[SHOPPER_ECI]': '0103910',
    'customParameters[SHOPPER_PSERV]': apiDf.serv,
    'customParameters[SHOPPER_VAL_BASE0]': '0.00',
    'customParameters[SHOPPER_VAL_BASEIMP]': customParameters.baseImp,
    'customParameters[SHOPPER_VAL_IVA]': customParameters.iva,
    'customParameters[SHOPPER_VERSIONDF]': '2',
  };
  return newData;
};

export const convertDataHotel = (data: Record<string, string>) => ({
  ...data,
  room_groups: undefined,
  star_certificate: data.star_certificate === null ? undefined : data.star_certificate,
  serp_filters: data.serp_filters === null ? undefined : data.serp_filters,
  front_desk_time_start:undefined,
  front_desk_time_end:undefined,
  is_gender_specification:undefined,
  is_gender_specification_required:undefined,
  //front_desk_time_start: data.front_desk_time_start === " " ? undefined : data.front_desk_time_start,
  //front_desk_time_end: data.front_desk_time_end === " " ? undefined : data.front_desk_time_end,
});

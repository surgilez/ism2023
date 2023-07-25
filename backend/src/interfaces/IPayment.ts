type identificationDocType = 'IDCARD' | 'PASSPORT' | 'TAXSTATEMENT';

interface ICustomer {
  givenName: string;
  middleName: string;
  surname: string;
  ip: string;
  merchantCustomerId: string;
  email: string;
  identificationDocType: identificationDocType;
  identificationDocId: string;
  phone: string;
}

interface ICart {
  name: string;
  description: string;
  price: string;
  quantity: string;
}

interface IAddress {
  street1: string;
  country: string;
}

interface ICustomParameters {
  baseImp: string;
  iva: string;
}

export interface IPayment {
  amount: string;
  customer: ICustomer;
  merchantTransactionId: string;
  cart: ICart[];
  shipping: IAddress;
  billing: IAddress & { postCode: string };
  customParameters: ICustomParameters;
}

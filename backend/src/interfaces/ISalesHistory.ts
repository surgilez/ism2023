interface ICart {
  order: {
    partner_order_id: '19c5f6a4-0367-48fd-a493-e5f10c953be2';
  };
}

interface IVoucher {
  email: string;
}

interface IFormSalesHistory {
  voucher: IVoucher;
}

export interface ISalesHistory {
  shopping: ICart[];
  form: IFormSalesHistory;
}

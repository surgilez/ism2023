import { apiDf, apiRatehack, tokens } from '@config/env';
import { IPayment } from '@interfaces/IPayment';
import { dataPayment } from '@utils/convertData';
import errorMessage from '@utils/errorMessage';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const checkOutId = async (req: Request, res: Response) => {
  try {
    const data = req.body as IPayment;
    const resultData = new URLSearchParams({ ...dataPayment(data) });
    for (let i = 0; i < data.cart.length; i++) {
      const param = `cart.items[${i}]`;
      resultData.append(`${param}.name`, data.cart[i].name);
      resultData.append(`${param}.description`, data.cart[i].description);
      resultData.append(`${param}.price`, data.cart[i].price);
      resultData.append(`${param}.quantity`, data.cart[i].quantity);
    }
    const result = await fetch(`${apiDf.url}/v1/checkouts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiDf.token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: resultData,
    });
    return res.json({ data: await result.json() });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const paymentStatus = async (req: Request, res: Response) => {
  try {
    const result = await fetch(`${apiDf.url}/v1/checkouts/${req.params.id}/payment?entityId=${apiDf.entityId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiDf.token}`,
      },
    });
    return res.json({ data: await result.json() });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getVoucher = async (req: Request, res: Response) => {
  try {
    const token = req.params.id;
    if (!token) throw new Error('No se encontró el token');
    const { id } = <{ id: string }>verify(String(token), tokens.accessToken);
    const data = JSON.stringify({ partner_order_id: id, language: 'es' });
    const encoded = Buffer.from(`${apiRatehack.user}:${apiRatehack.password}`).toString('base64');
    const result = await fetch(`${apiRatehack.url}/hotel/order/document/voucher/download/?data=${data}`, {
      method: 'GET',
      headers: { Authorization: `Basic ${encoded}` },
    });
    const buffer = Buffer.from(new Uint8Array(await result.arrayBuffer()));
    return res.send(buffer);
  } catch (error) {
    return errorMessage(res, error);
  }
};

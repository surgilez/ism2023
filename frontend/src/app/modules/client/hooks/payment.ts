import { IPayment } from '../interface/payment'
import { useSelector, useDispatch } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'
import { publicIpv4 } from 'public-ip'
import { useState, useEffect } from 'react'
import moment from '@helpers/moment'
import { addZeroes } from '@helpers/payment'

export const usePayment = () => {
  const {
    user,
    auth,
    shopping,
    client: { payment },
  } = useSelector((i: Redux) => i)
  const dispatch = useDispatch()

  const init: IPayment = {
    amount: 0,
    customer: {
      givenName: user.name,
      middleName: '',
      surname: user.lastName,
      ip: '',
      merchantCustomerId: auth.uid || '',
      email: user.email,
      identificationDocType: 'IDCARD',
      identificationDocId: user.doc || '',
      phone: user.phone,
    },
    merchantTransactionId: auth.uid || '',
    acceptConditions: false,
    cart: [
      {
        name: '',
        description: '',
        price: 0,
        quantity: 1,
      },
    ],
    shipping: {
      street1: '',
      country: '',
    },
    billing: {
      street1: 'calle 1',
      country: 'EC',
      postCode: '170000',
    },
    customParameters: {
      base0: 0,
      baseImp: 1.0,
      iva: 0.12,
    },
    extra: {
      bill: {
        email: user.email,
        identificationDocId: user.doc || '',
        identificationDocType: 'IDCARD',
        lastName: user.lastName,
        name: user.name,
        secondName: '',
      },
      voucher: {
        email: user.email,
        confirmEmail: user.email,
        offer: false,
      },
      phone: [
        {
          number: user.phone,
          typePhone: 'MOBILE',
        },
      ],
      rooms: [
        {
          guests: [
            {
              first_name: user.name,
              last_name: user.lastName,
            },
          ],
        },
      ],
      language: 'es',
      user: {
        comment: '',
        email: user.email,
        phone: user.phone,
      },
      partner: {
        partner_order_id: '',
        comment: '',
        amount_sell_b2b2c: '',
      },
      payment_type: {
        type: 'deposit',
        amount: '',
        currency_code: 'USD',
        is_need_cvc: false,
        is_need_credit_card_data: false,
      },
    },
  }

  const [initValue, setInitValue] = useState(init)

  useEffect(() => {
    publicIpv4().then((IP) => {
      setInitValue((val) => ({ ...val, customer: { ...val.customer, ip: IP } }))
    })
  }, [setInitValue])

  useEffect(() => {
    if (shopping && shopping.shopping) {
      let baseImponible = 0
      let iva = 0

      const cart = shopping.shopping.map((cart) => {
        baseImponible += cart.total - cart.iva
        iva += cart.iva

        return {
          name: cart.item_name || '',
          description: `Reserva de ${cart.item_name} en ${cart.name} por ${
            cart.night === 1 ? 'una noche' : `${cart.night} noches`
          }, fecha de inicio: ${moment
            .unix(cart.checkin as number)
            .format('dddd DD [de] MMMM [del] YYYY')} hasta ${moment
            .unix(cart.checkout as number)
            .format('dddd DD [de] MMMM [del] YYYY')}`,
          price: addZeroes(cart.total.toFixed(2)),
          quantity: cart.night,
        }
      })

      setInitValue((val) => ({
        ...val,
        cart,
        customParameters: {
          base0: 0,
          baseImp: baseImponible,
          iva,
        },
      }))
      console.log(initValue)
    }
  }, [shopping, setInitValue])

  return {
    initValue,
    shopping,
    dispatch,
    payment,
  }
}

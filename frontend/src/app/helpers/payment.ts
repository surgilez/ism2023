import { NewBookingData, PaymentType } from '@client/interface/payment'

export const verifyPaymentMethod = async (
  booking?: NewBookingData
): Promise<PaymentType> => {
  //only verified payment in USD

  return new Promise((resolve, reject) => {
    console.log(booking?.payment_types)
    if (!booking || !booking.payment_types) {
      return reject('booking is undefined')
    }
    console.log(booking.payment_types)
    const paymentType = booking.payment_types.find(
      ({ currency_code, type }) => currency_code === 'USD' && type === 'deposit'
    )
    console.log(booking.payment_types)
    return resolve(paymentType as PaymentType)
  })
}

export function addZeroes(num: string) {
  const dec = num.split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2
  return Number(num).toFixed(len)
}

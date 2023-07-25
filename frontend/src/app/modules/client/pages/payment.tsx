import { SkeletonCart } from '@utils/components/skeleton/cart'
import { ProcessPayment } from '@client/components'

export const PaymentScreen = () => {
  const promiseInProgress = false

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full xl:w-[1200px] mt-8">
        <span className="font-medium text-xl text-white ">Proceso de pago</span>

        <div className="my-10 ">
          {promiseInProgress ? <SkeletonCart /> : <ProcessPayment />}
        </div>
      </div>
    </div>
  )
}

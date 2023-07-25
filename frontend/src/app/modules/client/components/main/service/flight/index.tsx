import moment from '@helpers/moment'

export const TopServiceFlight = () => {
  const data = [
    {
      id: 1,
      name: 'Viaje a Bogota',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      goingDate: new Date(),
      returnDate: new Date(),
    },
    {
      id: 2,
      name: 'Viaje a Barcelona',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      goingDate: new Date(),
      returnDate: new Date(),
    },
    {
      id: 3,
      name: 'Viaje a Cancún',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80',
      goingDate: new Date(),
      returnDate: new Date(),
    },
    {
      id: 4,
      name: 'Viaje a Tierra Santa',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1574513828599-a4fefc82fe7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      goingDate: new Date(),
      returnDate: new Date(),
    },
  ]

  return (
    <div className="my-8">
      <span className="text-primary text-center xl:text-left text-3xl font-medium block">
        TOP DESTINOS / BILLETES DE AVION
      </span>

      <div className="flex gap-5 flex-wrap justify-center xl:justify-between mt-5">
        {data.map((hotel, i) => (
          <div key={i} className="shadow-xl w-[270px] rounded-lg bg-base-100">
            <img
              src={hotel.img}
              alt="hotel_img"
              className="w-full block object-cover rounded-t-lg h-[160px]"
            />

            <div className="px-4 py-5">
              <h2 className="text-black text-xl font-medium block h-[40px]">
                {hotel.name}
              </h2>

              <p className="mt-3 text-sm my-3">Desde {hotel.from}</p>

              <div className="flex">
                <div className="w-1/2">
                  <span className="text-sm">Ida:</span>
                  <p className="text-sm font-bold text-[#6B6CB0]">
                    {moment(hotel.goingDate).format('ddd DD MMM')}
                  </p>
                </div>
                <div className="border border-gray-400 h-[50px] mx-2" />

                <div className="w-1/2 ml-2">
                  <span className="text-sm">Vuelta:</span>
                  <p className="text-sm font-bold text-[#6B6CB0]">
                    {moment(hotel.goingDate).format('ddd DD MMM')}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center mt-3">
                <button className="btn__gold btn btn-xs " type="button">
                  Ver detalle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

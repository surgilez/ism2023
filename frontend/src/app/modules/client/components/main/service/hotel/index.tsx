import { RatingComponent } from '@utils/components/rating.jsx'

export const TopServiceHotel = () => {
  const data = [
    {
      id: 1,
      name: 'Pullman Miami Airport',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1464&q=80',
      rating: 7.6,
    },
    {
      id: 2,
      name: 'Sheraton Quito',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 6.5,
    },
    {
      id: 3,
      name: 'Tequendama Bogota',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 9.1,
    },
    {
      id: 4,
      name: 'Sani Lodge Oriente',
      from: 'Quito',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      rating: 9.7,
    },
  ]

  return (
    <div className="my-8">
      <span className="text-primary text-center xl:text-left text-3xl font-medium block">
        TOP HOTELES
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
              <h2 className="text-black text-xl font-medium block h-[50px]">
                {hotel.name}
              </h2>

              <p className="mt-3 text-sm my-3">Desde {hotel.from}</p>

              <div>
                <span className="p-1 bg-gray-600 mr-2 text-white rounded-md text-sm">
                  {hotel.rating.toFixed(1)}
                </span>
                <RatingComponent
                  initialRating={hotel.rating / 2}
                  fractions={2}
                  readonly
                  emptySymbol={
                    <i className="fa-regular fa-star text-primary" />
                  }
                  fullSymbol={<i className="fa-solid fa-star text-primary" />}
                />
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

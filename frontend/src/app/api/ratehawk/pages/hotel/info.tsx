import { HotelInfo } from '@api/ratehawk/interface/hotel'
import { useState } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { ComponentLoader } from '@utils/components'
import FsLightbox from 'fslightbox-react'
import { Room } from './room'
interface IProps {
  info?: HotelInfo
  className?: string
}

export const DetailHotelRender = ({ info, className }: IProps) => {
  const [{ open, slide }, setToggler] = useState({
    open: false,
    slide: 1,
  })

  const images = info?.images.map((photo) =>
    photo.replace('{size}', '1024x768')
  )

  const { promiseInProgress } = usePromiseTracker({ area: 'hotelSearch' })

  return (
    <div className={`${className}`}>
      {promiseInProgress ? (
        <div className="min-h-screen w-full grid place-content-center">
          <ComponentLoader bg="bg-primary" />
        </div>
      ) : (
        <div className="p-5 flex justify-center">
          <div className="w-full xl:w-[1200px] mt-8">
            <div className="flex flex-col ">
              <span className="text-gray-200 text-2xl md:text-4xl font-bold">
                {info?.name}
              </span>
              <span className="text-gray-400 ">
                {info?.address} <small>({info?.postal_code})</small>{' '}
                <small>({info?.phone})</small>
              </span>
              <span className="text-gray-400 text-sm">{info?.email}</span>
            </div>

            <div className="hotel_img-gallery mt-10 scroll_none">
              {images &&
                images?.map((img, i) => (
                  <img
                    key={i}
                    src={img.replace('{size}', 'x500')}
                    alt={`img_${{ i }}`}
                    onClick={() =>
                      setToggler((val) => ({
                        ...val,
                        open: !val.open,
                        slide: i + 1,
                      }))
                    }
                  />
                ))}
            </div>

            <FsLightbox toggler={open} sources={images} slide={slide} />

            <div className="mt-10">
              <Room />
            </div>

            <div className="mt-10 flex flex-col md:flex-row justify-between gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  {info?.payment_methods &&
                    info &&
                    info?.payment_methods.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Métodos de pago
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.payment_methods.map((method, i) => (
                            <li key={i} className="text-gray-100 text-xl">
                              {method.replace('_', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="w-full md:w-1/2 ">
                <div className="flex w-full flex-col gap-2">
                  <div>
                    <span className="text-2xl font-bold text-gray-200">
                      El Hotel
                    </span>
                    <p className="mt-5 text-gray-200 text-justify p-5 bg-[#4E5B96] rounded-md">
                      {info?.description_struct[0].paragraphs}
                    </p>
                  </div>
                  <div className="mt-5 text-gray-200 text-justify p-5 bg-[#4E5B96] rounded-md flex justify-evenly flex-wrap">
                    <div className="w-1/3 gap-2">
                      <strong className="text-sm">Año de construcción</strong>

                      <span className="text-gray-400 block">
                        {info?.facts.year_built || 'No definido'}
                      </span>
                    </div>
                    <div className="w-1/3 gap-2">
                      <strong className="text-sm">Año de renovación</strong>
                      <span className="text-gray-400 block">
                        {info?.facts.year_renovated || 'No definido'}
                      </span>
                    </div>
                    <div className="w-1/3 gap-2">
                      <strong className="text-sm">Habitaciones / pisos</strong>
                      <div className="text-gray-400">
                        <span className="block">
                          {info?.facts.rooms_number}{' '}
                          {info?.facts.rooms_number === 1
                            ? 'Habitación'
                            : 'Habitaciones'}
                        </span>
                        {info?.facts.floors_number && (
                          <span className="block">
                            {info?.facts.floors_number}{' '}
                            {info?.facts.floors_number === 1 ? 'piso' : 'pisos'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row justify-between gap-8">
              <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  {info?.metapolicy_struct.add_fee &&
                    info.metapolicy_struct.add_fee.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Add Fee
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.add_fee.map((add_fee, i) => (
                            <li key={i} className="flex flex-col gap-3 ">
                              <div className="text-gray-100 text-lg ">
                                <p>{add_fee.fee_type}</p>
                                <p>
                                  <span className="text-md">
                                    Tipo de moneda: {add_fee.currency}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    {add_fee.price}{' '}
                                    {add_fee.price_unit.replaceAll('_', ' ')}
                                  </span>
                                </p>
                              </div>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {info?.metapolicy_struct.internet &&
                    info.metapolicy_struct.internet.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Internet
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.internet.map(
                            (internet, i) => (
                              <li key={i} className="flex flex-col gap-3 ">
                                <div className="text-gray-100 text-lg ">
                                  <p>
                                    Tipo de internet: {internet.internet_type}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Inclusión: {internet.inclusion}
                                    </span>
                                    {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Precio: {internet.price}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Precio unitario: {internet.price_unit}
                                    </span>
                                  </p>
                                </div>
                                <br />
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {info?.metapolicy_struct.shuttle &&
                    info.metapolicy_struct.shuttle.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Shuttle
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.shuttle.map((shuttle, i) => (
                            <li key={i} className="flex flex-col gap-3 ">
                              <div className="text-gray-100 text-lg ">
                                <p>Tipo: {shuttle.destination_type}</p>
                                <p>
                                  <span className="text-md">
                                    Inclusión:{' '}
                                    {shuttle.inclusion.replaceAll('_', ' ')}
                                  </span>
                                  {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                </p>
                                <p>
                                  <span className="text-md">
                                    Moneda: {shuttle.currency}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Precio: {shuttle.price}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Shuttle type :{' '}
                                    {shuttle.shuttle_type.replaceAll('_', ' ')}
                                  </span>
                                </p>
                              </div>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  {info?.metapolicy_struct.deposit &&
                    info.metapolicy_struct.deposit.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Depósito
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.deposit.map((deposit, i) => (
                            <li key={i} className="flex flex-col gap-3 ">
                              <div className="text-gray-100 text-lg ">
                                <p>Tipo de depósito: {deposit.deposit_type}</p>
                                <p>
                                  <span className="text-md">
                                    Tipo de pago: {deposit.payment_type}
                                  </span>
                                  {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                </p>
                                <p>
                                  <span className="text-md">
                                    Moneda: {deposit.currency}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Precio: {deposit.price}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Precio unitario:{' '}
                                    {deposit.price_unit.replaceAll('_', ' ')}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Disponibilidad: {deposit.availability}
                                  </span>
                                </p>
                              </div>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  {info?.metapolicy_struct.deposit &&
                    info.metapolicy_struct.deposit.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Parking
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.parking.map((parking, i) => (
                            <li key={i} className="flex flex-col gap-3 ">
                              <div className="text-gray-100 text-lg ">
                                <p>
                                  tipo de territorio: {parking.territory_type}
                                </p>
                                <p>
                                  <span className="text-md">
                                    Inclusión:{' '}
                                    {parking.inclusion.replaceAll('_', ' ')}
                                  </span>
                                  {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                </p>
                                <p>
                                  <span className="text-md">
                                    Moneda: {parking.currency}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Precio: {parking.price}
                                  </span>
                                </p>
                                <p>
                                  <span className="text-md">
                                    Precio unitario:{' '}
                                    {parking.price_unit.replaceAll('_', ' ')}
                                  </span>
                                </p>
                              </div>
                              <br />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  {info?.metapolicy_struct.children &&
                    info.metapolicy_struct.children.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Niños
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.children.map(
                            (children, i) => (
                              <li key={i} className="flex flex-col gap-3 ">
                                <div className="text-gray-100 text-lg ">
                                  <p>
                                    De{' '}
                                    {`${children.age_start}-${children.age_end} años`}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Cama extra: {children.extra_bed}
                                    </span>
                                    <span className="ml-2">
                                      Precio: {children.price}
                                    </span>
                                  </p>
                                </div>
                                <br />
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {info?.metapolicy_struct.children &&
                    info.metapolicy_struct.children.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Comida para niños
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.children_meal.map(
                            (children_meal, i) => (
                              <li key={i} className="flex flex-col gap-3 ">
                                <div className="text-gray-100 text-lg ">
                                  <p>
                                    De{' '}
                                    {`${children_meal.age_start}-${children_meal.age_end} años`}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Moneda: {children_meal.currency}
                                    </span>
                                    {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Precio: {children_meal.price}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Inclusión:{' '}
                                      {children_meal.inclusion.replaceAll(
                                        '_',
                                        ' '
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <br />
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {info?.metapolicy_struct.deposit &&
                    info.metapolicy_struct.deposit.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Cama extra
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.extra_bed.map(
                            (extra_bed, i) => (
                              <li key={i} className="flex flex-col gap-3 ">
                                <div className="text-gray-100 text-lg ">
                                  <p>Monto: {extra_bed.amount}</p>
                                  <p>
                                    <span className="text-md">
                                      Tipo de moneda: {extra_bed.currency}
                                    </span>
                                    {/* <span className="ml-2">
                                      Incluido: {children_meal.inclusion}
                                    </span> */}
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Inclusión: {extra_bed.inclusion}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Precio: {extra_bed.price}
                                    </span>
                                  </p>
                                  <p>
                                    <span className="text-md">
                                      Precio unitario:{' '}
                                      {extra_bed.price_unit.replaceAll(
                                        '_',
                                        ' '
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <br />
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  {info?.metapolicy_struct.pets &&
                    info.metapolicy_struct.pets.length > 0 && (
                      <div>
                        <span className="text-2xl font-bold text-gray-200">
                          Mascotas
                        </span>
                        <ul className="mt-5 bg-[#4e5b96] rounded-md p-5">
                          {info?.metapolicy_struct.pets.map((pets, i) => (
                            <li key={i} className="flex flex-col gap-3 ">
                              <div className="text-gray-100 text-lg ">
                                <p>Tipo de mascota: {pets.pets_type}</p>
                                <p>
                                  <span className="text-md">
                                    {pets.currency}
                                  </span>
                                  <span className="ml-2">
                                    {pets.price} por huésped
                                  </span>
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <span className="text-2xl font-bold text-gray-200">
                Información adicional
              </span>
              <ul className="mt-5 bg-[#4e5b96] rounded-md p-5 flex flex-col gap-4 text-gray-200">
                {info?.metapolicy_extra_info &&
                info?.metapolicy_extra_info.length > 0 ? (
                  <li>
                    <p>{info?.metapolicy_extra_info}</p>
                  </li>
                ) : (
                  <div>No existen políticas vigentes</div>
                )}
              </ul>
            </div>
            <div className="mt-10">
              <span className="text-2xl font-bold text-gray-200">
                Servicios
              </span>
              <div className="mt-5 mb-10 text-gray-600 text-justify p-5 bg-[#4E5B96] rounded-md flex justify-evenly gap-4 flex-wrap">
                {info?.amenity_groups.map(({ amenities, group_name }, i) => (
                  <div
                    key={i}
                    className="flex-auto w-[250px] p-2 rounded-md bg-gray-200"
                  >
                    <div>
                      {group_name === 'General' && (
                        <i className="fa-solid fa-bell-concierge" />
                      )}
                      {group_name === 'Internet' && (
                        <i className="fa-solid fa-wifi" />
                      )}
                      {group_name === 'Piscina y playa' && (
                        <i className="fa-solid fa-person-swimming" />
                      )}
                      {group_name === 'Medidas de seguridad y salud' && (
                        <i className="fa-solid fa-heart-pulse" />
                      )}
                      {group_name === 'Habitaciones' && (
                        <i className="fa-solid fa-bed" />
                      )}
                      {group_name === 'Comidas' && (
                        <i className="fa-solid fa-utensils" />
                      )}
                      {group_name === 'Idiomas disponibles' && (
                        <i className="fa-solid fa-language" />
                      )}
                      {group_name === 'Traslado' && (
                        <i className="fa-solid fa-helicopter" />
                      )}
                      {group_name === 'Accesibilidad' && (
                        <i className="fa-solid fa-wheelchair-move" />
                      )}
                      {group_name === 'Belleza y bienestar' && (
                        <i className="fa-solid fa-scissors" />
                      )}
                      {group_name === 'Aparcamiento' && (
                        <i className="fa-solid fa-square-parking text-xl" />
                      )}
                      {group_name === 'Negocios' && (
                        <i className="fa-solid fa-marker" />
                      )}
                      {group_name === 'Niños' && (
                        <i className="fa-solid fa-children" />
                      )}
                      {group_name === 'Servicios de turismo' && (
                        <i className="fa-solid fa-route" />
                      )}
                      {group_name === 'Deportes' && (
                        <i className="fa-solid fa-dumbbell" />
                      )}
                      {group_name === 'Servicios e instalaciones' && (
                        <i className="fa-solid fa-building-shield" />
                      )}
                      {group_name === 'Mascotas' && (
                        <i className="fa-solid fa-paw" />
                      )}

                      <span className="text-lg font-bold ml-2">
                        {group_name}
                      </span>
                    </div>

                    <ul className="flex flex-col pl-7 gap-1 list-disc">
                      {amenities.map((amenity, j) => (
                        <li key={j}>
                          <span className="text-sm">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-10">
              <span className="text-2xl font-bold text-gray-200">
                Condiciones del Registro
              </span>
              <div className="bg-[#4e5b96] p-8 mt-5 text-gray-200 flex flex-col gap-10 rounded-lg">
                <div>
                  <strong>Check-in</strong>
                  <span className="block text-gray-300">
                    Después de las {info?.check_in_time}
                  </span>
                </div>

                <div>
                  <strong>Check-out</strong>
                  <span className="block text-gray-300">
                    Antes de las {info?.check_out_time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

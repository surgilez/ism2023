import Access from '@assets/svg/acceso-instalaciones-icon.svg'
import Flight from '@assets/svg/voleto-aereo-icon.svg'
import Hotel from '@assets/svg/hotel-icon.svg'
import Car from '@assets/svg/servicios-auto-icon.svg'
import Schedule from '@assets/svg/calendario-icon.svg'
import Family from '@assets/svg/paquetes-icon.svg'
import Diamond from '@assets/svg/diamante-icon.svg'
import Events from '@assets/svg/eventos-icon.svg'
import Office from '@assets/svg/oficina-icon.svg'
import VideoCall from '@assets/svg/videollamada-icon.svg'
import Community from '@assets/svg/comunidad-icon.svg'
import Benefits from '@assets/svg/beneficios-icon.svg'
import Time from '@assets/svg/tiempo-icon.svg'
import Saving from '@assets/svg/ahorro-icon.svg'
import Variety from '@assets/svg/variedad-icon.svg'
import Garanty from '@assets/svg/garantia-precios-icon.svg'

export const AboutScreen = () => {
  const services = [
    {
      title: 'Acceso a instalaciones en Grand Diamond Bach',
      img: Access,
      desc: `Gracias a nuestra alianza estratégica con VIP
                CONSTRUCTORA, el afiliado de acuerdo a su
                suscripción puede gozar de Alojamientos en
                departamentos de 2 y 3 dormitorios con capacidad
                de hasta 9personas ubicados en Tonsupa Ecuador.`,
    },
    {
      title: 'Tickets de Avión',
      img: Flight,
      desc: `Garantizamos el precio más bajo del mercado y la 
                eliminación del Fee de emisión, y acumula Hasta un 30 
                % de Diamond Points en Rutas Nacionales y un 
                50% de Diamond Points en Rutas Internacionales.`,
    },
    {
      title: 'Hoteles',
      img: Hotel,
      desc: `Disponemos de más de 200,000 hoteles alrededor del mundo,
                y le garantizamos el precio más bajo del mercado, 
                nuestros precios llegan hasta 60% más baratos de la 
                tarifas al público.`,
    },
    {
      title: 'Servicios movilización terrestre',
      img: Car,
      desc: `Disponemos de más de 200,000 hoteles alrededor del mundo,
                y le garantizamos el precio más bajo del mercado, 
                nuestros precios llegan hasta 60% más baratos de la 
                tarifas al público.`,
    },
    {
      title: 'Diamond weeks',
      img: Schedule,
      desc: `Alojamientos en más de 6,500 Resorts, en apartamentos de 1, 2 y 3 dormitorios, 
                en selectos destinos turísticos, y en más de 
                250,000 Hoteles alrededor del mundo con semanas de hospedajes desde USD 399,00.`,
    },
    {
      title: 'Paquetes de vacaciones',
      img: Family,
      desc: `En este servicio le ofrecemos las tarifas más bajas 
                del mercado con descuentos de hasta el 30% 
                en paquetes a cualquier parte del Mundo.`,
    },
    {
      title: 'Diamonds points',
      img: Diamond,
      desc: `Nuestro programa de viajero frecuente le permite ganar Diamond Points 
            cada vez que utiliza nuestros servicios y además 
            le permite utilizar dichos Diamond Points en conjunto 
            con dinero para el pago de Alojamientos.`,
    },
  ]

  const IsmDiffents = [
    {
      title: 'Comunidad exclusiva',
      img: Community,
      desc: `Forma parte de la comunidad con acceso a la mayor 
            gama de opciones para vacacionar en el Mundo.`,
    },
    {
      title: 'Beneficios',
      img: Benefits,
      desc: `Accede a nuestros servicios turísticos con 
            las opciones para vacacionar y las mejores promociones del mercado.`,
    },
    {
      title: 'Tiempos',
      img: Time,
      desc: `Organiza tu viaje con hasta 24 Hrs de Anticipación 
                sin importar la temporada del año.`,
    },
    {
      title: 'Ahorros',
      img: Saving,
      desc: `Es un hecho establecido hace demasiado tiempo 
            que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.`,
    },
    {
      title: 'Variedad',
      img: Variety,
      desc: `Contamos con mas de 250.000 Alojamientos en todo el 
            mundo para que puedas vacacionar con tu familia..`,
    },
    {
      title: 'Garantía de precios',
      img: Garanty,
      desc: `A través del beneficio "Garantía de precio" siempre pagarás 
            valores inferiores a los establecidos en el mercado..`,
    },
  ]

  return (
    <div className="animate__animated animate__fadeIn">
      <section className="about h-screen flex justify-center items-center w-full">
        <div className="w-full p-5 md:w-[700px]">
          <h3 className="text-6xl md:text-9xl text-white text-center">
            Conoce ISM
          </h3>
          <span className="block text-center text-white text-2xl mt-14 mb-28">
            International Signature Members es una compañía Ecuatoriana que
            llegó al mercado para garantizarte los mejores precios al momento de{' '}
            <strong>vacacionar en cualquier parte del mundo.</strong>
          </span>
        </div>
      </section>
      <section className="bg-grandient-secondary w-full pb-20">
        <div className="w-full flex justify-center items-center py-20">
          <span className="text-gold text-4xl lg:text-5xl font-bold block text-center w-full lg:w-[500px]">
            Beneficios para nuestros afiliados
          </span>
        </div>
        <div className="w-full flex justify-center py-10">
          <div className="w-full xl:w-[1200px] px-10 xl:px-0 flex flex-wrap justify-between gap-10">
            {services.map((item, i) => (
              <div
                key={i}
                className="w-full flex flex-col items-center lg:w-[450px] xl:w-[550px] lg:items-start"
              >
                <img
                  src={item.img}
                  alt={`service_${i}`}
                  className="w-[150px] h-[150px] mb-5"
                />
                <span className="text-2xl text-white block mb-5">
                  {item.title}
                </span>
                <p className="text-gray-400 text-justify">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black w-full pb-20">
        <div className="w-full flex justify-center items-center py-20">
          <span className="text-gold text-4xl lg:text-5xl font-bold block text-center w-full lg:w-[500px]">
            Como adquirir nuestros servicios
          </span>
        </div>
        <div className="w-full flex justify-center py-10">
          <div className="w-full xl:w-[1200px] px-10 xl:px-0 flex flex-wrap justify-between gap-10">
            <div className="w-full flex flex-col items-center lg:w-[450px] xl:w-[550px] lg:items-start">
              <img
                src={Events}
                alt="event"
                className="w-[150px] h-[150px] mb-5"
              />
              <span className="text-2xl text-white block mb-5">
                Conecta con los eventos
              </span>
              <p className="text-gray-400 text-justify">
                Por medio del formulario podrás compartirnos tus datos y nuestro
                equipo comercial te contactará para invitarte a los eventos
                locales que realizamos en cada región.
              </p>
            </div>

            <div className="w-full flex flex-col items-center lg:w-[450px] xl:w-[550px] lg:items-start">
              <img
                src={Office}
                alt="event1"
                className="w-[150px] h-[150px] mb-5"
              />
              <span className="text-2xl text-white block mb-5">Oficinas</span>
              <p className="text-gray-400 text-justify">
                Puedes visitar nuestra sede central en la calle De los
                Motilones, Entre Bermejo y Charapa. Edificio Diamond 4. Quito,
                Ecuador. Horario de Atención: 09:00 Hrs - 18:00 Hrs.
              </p>
            </div>

            <div className="w-full flex flex-col items-center lg:w-[450px] xl:w-[550px] lg:items-start">
              <img
                src={VideoCall}
                alt="event1"
                className="w-[150px] h-[150px] mb-5"
              />
              <span className="text-2xl text-white block mb-5">
                Virtualmente
              </span>
              <p className="text-gray-400 text-justify">
                Programa una reunión virtual a través de tu plataforma favorita
                (Zoom, Team, Whatsapp, llamada telefónica) con uno de nuestros
                Asesores; Para esto, sólo tendrás que llenar nuestro formulario
                y nos pondremos en contacto en la brevedad posible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grandient-secondary w-full pb-20">
        <div className="w-full flex justify-center items-center py-20">
          <span className="text-gold text-4xl lg:text-5xl font-bold block text-center w-full lg:w-[500px]">
            Qué hace diferente a ISM
          </span>
        </div>
        <div className="w-full flex justify-center py-10">
          <div className="w-full xl:w-[1200px] px-10 xl:px-0 flex flex-wrap justify-between gap-10">
            {IsmDiffents.map((item, i) => (
              <div
                key={i}
                className="w-full flex flex-col items-center lg:w-[450px] xl:w-[550px] lg:items-start"
              >
                <img
                  src={item.img}
                  alt={`service_${i}`}
                  className="w-[150px] h-[150px] mb-5"
                />
                <span className="text-2xl text-white block mb-5">
                  {item.title}
                </span>
                <p className="text-gray-400 text-justify">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import ChatIcon from '@assets/svg/chat-gold.svg'
import CallIcon from '@assets/svg/llamada-gold.svg'
import AssistantIcon from '@assets/svg/asistencia-gold.svg'
import OfficeIcon from '@assets/svg/oficina-gold.svg'
import VideoCallIcon from '@assets/svg/videollamada-gold.svg'

export const Help = () => {
  const faq = [
    {
      title: '¿Como funciona?',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempora porro veniam quis? Quia dignissimos 
            consequuntur aperiam maiores quaerat nihil exercitationem accusamus eveniet, iste asperiores unde, repudiandae 
            reprehenderit voluptate! Labore nulla id iure nihil reprehenderit accusantium, dolorum nemo illo ratione 
            eum dolorem voluptatum facere porro laboriosam tenetur adipisci atque laudantium.
            `,
    },
    {
      title: '¿Por Que?',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempora porro veniam quis? Quia dignissimos 
            consequuntur aperiam maiores quaerat nihil exercitationem accusamus eveniet, iste asperiores unde, repudiandae 
            reprehenderit voluptate! Labore nulla id iure nihil reprehenderit accusantium, dolorum nemo illo ratione 
            eum dolorem voluptatum facere porro laboriosam tenetur adipisci atque laudantium.
            `,
    },
    {
      title: '¿Que debo hacer?',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempora porro veniam quis? Quia dignissimos 
            consequuntur aperiam maiores quaerat nihil exercitationem accusamus eveniet, iste asperiores unde, repudiandae 
            reprehenderit voluptate! Labore nulla id iure nihil reprehenderit
            `,
    },
    {
      title: '¿Que es?',
      body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta tempora porro veniam quis? Quia dignissimos 
            consequuntur aperiam maiores quaerat nihil exercitationem accusamus eveniet, iste asperiores unde, repudiandae 
            reprehenderit voluptate! Labore nulla id iure nihil reprehenderit
            `,
    },
  ]

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full xl:w-[1200px] mt-8">
        <span className="font-medium text-xl text-white ">
          <span className="block text-center text-4xl">
            Estaremos gustosos en ayudarte
          </span>

          <div className="mt-36">
            {/* <span className="block text-2xl">
                            Contactanos
                        </span> */}
            <div className="mt-8 flex gap-5 items-center md:justify-around flex-col md:flex-row">
              <div className="w-[150px] h-[150px]">
                <img
                  className="object-cover w-full drop-shadow-xl block"
                  src={ChatIcon}
                  alt="ChatIcon"
                />
                <span className="block text-center text-lg">
                  Chatea con nosotros
                </span>
              </div>
              <div className="w-[150px] h-[150px]">
                <img
                  className="object-cover w-full drop-shadow-xl block"
                  src={CallIcon}
                  alt="CallIcon"
                />
                <span className="block text-center text-lg">LLámanos</span>
              </div>
              <div className="w-[150px] h-[150px]">
                <img
                  className="object-cover w-full drop-shadow-xl block"
                  src={AssistantIcon}
                  alt="AssistantIcon"
                />
                <span className="block text-center text-lg">
                  Déjanos llamarte
                </span>
              </div>
              <div className="w-[150px] h-[150px]">
                <img
                  className="object-cover w-full drop-shadow-xl block"
                  src={OfficeIcon}
                  alt="OfficeIcon"
                />
                <span className="block text-center text-lg">
                  Visitanos fisicamente
                </span>
              </div>
              <div className="w-[150px] h-[150px]">
                <img
                  className="object-cover w-full drop-shadow-xl block"
                  src={VideoCallIcon}
                  alt="VideoCallIcon"
                />
                <span className="block text-center text-lg">
                  Visita virtual videollamada
                </span>
              </div>
            </div>

            <div className="mt-36 mb-8">
              <span className="text-2xl">Preguntas Frecuentes</span>

              <div className="flex  gap-8 justify-around flex-wrap mt-8">
                {faq.map((item, i) => (
                  <div
                    key={i}
                    className="card w-[275px] glass max-h-[350px] overflow-y-auto scroll_none py-3"
                  >
                    <div className="card-body">
                      <h2 className="card-title text-xl mb-5 font-bold">
                        {item.title}
                      </h2>
                      <p className="text-base text-gray-300">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  )
}

import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'

export const SelectSomethingChat = () => {
  const { rol } = useSelector((i: Redux) => i.user)

  return (
    <div
      className={`flex flex-col justify-center ${
        rol === 'client' && 'text-white'
      }`}
    >
      <h3 className="w-full text-center text-2xl">Seleccione una persona</h3>
      <p className="w-full text-center text-md">
        para iniciar una conversación
      </p>
    </div>
  )
}

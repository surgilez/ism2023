export const AssistantTravel = () => (
  <div className="w-full mt-10 ">
    <span className="text-[#14E8C8] font-bold text-md">
      ASISTENCIA DEL VIAJERO
    </span>

    <div className="bg-secondary p-4 mt-10 rounded-xl shadow-xl flex justify-between">
      <div className="w-[65%]">
        <span className="text-xl mb-5 block">ASSISCARD</span>
        <ul>
          <li className="text-sm">Asistencia médica hasta USD $40.000</li>
          <li className="text-sm">
            Asistencia en caso de robo o extravío de documentos
          </li>
          <li className="text-sm">Localización de equipajes</li>
        </ul>
      </div>
      <div className="hr-v" />
      <div>
        <ul>
          <li className="text-sm">Por 11 días para 1 persona</li>
          <li className="line-through text-sm">Antes: USD $59.00</li>
          <li className="mt-5 text-xl font-bold">
            <span>USD </span>
            <strong>42.00</strong>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

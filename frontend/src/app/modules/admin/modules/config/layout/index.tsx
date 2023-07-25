import { EmailConfig } from '../pages'

export const AdminConfigLayout = () => (
  <>
    <h1 className="font-bold text-2xl text-white">Configuración</h1>
    <div className="mt-2 rounded-xl p-5 bg-primary min-h-[800px]">
      <span className="btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 cursor-pointer rounded-2xl subNavActive">
        Configuración
      </span>
      <hr className="my-6 border-1 border-slate-200" />
      <EmailConfig />
    </div>
  </>
)

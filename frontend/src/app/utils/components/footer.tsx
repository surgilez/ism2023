export const Footer = () => (
  <div className="container_footer bg-gradient-banner text-white">
    <footer className="footer p-5 w-screen text-base-content">
      <div className="gap-7 max-w-[350px]">
        <span className="text-gray-200 font-bold text-lg">CONTACTO</span>

        <div className="text-white flex flex-col !break-all">
          <span className="footer-title">Dirección:</span>
          <span className="text-gray-200  ">
            De los Motilones, Entre Bermejo y Charapa. Edificio Diamond 4.
            Quito, Ecuador
          </span>
        </div>

        <div className="text-white flex flex-col ">
          <span className="footer-title">Teléfono:</span>
          <span className="text-gray-200">+593 (2) 3341464</span>
        </div>

        <div className="text-white flex flex-col ">
          <span className="footer-title">WhatsApp:</span>
          <span className="text-gray-200">+593 979792049</span>
        </div>

        <div className="text-white flex flex-col">
          <span className="footer-title">Correo electrónico:</span>
          <span className="text-gray-200">
            Serviciocliente@internationalsm.com
          </span>
        </div>
      </div>
      <div>
        <span className="text-gray-200 font-bold text-lg">Acerca de</span>
        <a href="/" className="link link-hover">
          ¿Como funciona?
        </a>
        <a href="/" className="link link-hover">
          Costos
        </a>
        <a href="/" className="link link-hover">
          Membresías
        </a>
      </div>
      <div>
        <span className="text-gray-200 font-bold text-lg">Legal</span>
        <a href="/" className="link link-hover">
          Términos y condiciones
        </a>
        <a href="/" className="link link-hover">
          Políticas de privacidad
        </a>
      </div>
      <div>
        <span className="text-gray-200 font-bold text-lg">Aliados</span>
        <a href="/" className="link link-hover">
          Hoteles
        </a>
        <a href="/" className="link link-hover">
          Condominios
        </a>
        <a href="/" className="link link-hover">
          Asistencia viajera
        </a>
      </div>
      <div>
        <span className="text-gray-200 font-bold text-lg">Síguenos</span>
        <a href="/" className="link link-hover">
          Facebook
        </a>
        <a href="/" className="link link-hover">
          Instagram
        </a>
        <a href="/" className="link link-hover">
          Twitter
        </a>
      </div>
    </footer>
  </div>
)

export default Footer

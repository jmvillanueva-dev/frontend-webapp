import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineGithub,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { FaUserCircle, FaRegIdBadge, FaUniversity } from "react-icons/fa";
import logoEsfot from "../../assets/logo-esfot.png";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 shadow-sm fixed w-full z-10">
        <div
          className="absolute inset-0 opacity-20 bg-cover -z-10"
          style={{ backgroundImage: "var(--wave-background)" }}
        ></div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <AiFillHome className="w-6 h-6 text-white mr-2" />
            <span className="text-xl font-semibold text-white">AppWeb</span>
          </div>

          {/* Botón de menú hamburguesa para móviles */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <AiOutlineClose className="w-6 h-6" />
            ) : (
              <AiOutlineMenu className="w-6 h-6" />
            )}
          </button>

          {/* Navegación para desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-white hover:text-blue-600 hover:bg-blue-50 font-medium transition-colors border border-gray-300 py-2 px-8 rounded-md"
                >
                  <FaRegIdBadge />
                  Registro
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  <FaUserCircle />
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-blue-950 hover:underline font-medium transition-colors py-2 px-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaRegIdBadge />
                  Registro
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-blue-950 px-4 py-2 rounded-md hover:underline font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserCircle />
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-15 md:py-12">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sistema de Gestión
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Esta aplicación web ha sido desarrollada como solución al caso
            propuesto en el Examen Final de Carrera en la Escuela de Formación
            de Tecnólogos de la EPN.
          </p>
        </section>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 md:mb-8 text-center">
            Desarrolladores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Card Cristian Tambaco */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 text-white">
                <span className="text-xl md:text-2xl font-bold">CT</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Cristian Tambaco
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Desarrollador Frontend
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/CristianTambaco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
                  aria-label="GitHub de Cristian Tambaco"
                >
                  <AiOutlineGithub className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 transition-colors transform hover:scale-110"
                  aria-label="LinkedIn de Cristian Tambaco"
                >
                  <AiOutlineLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Card Jhonny Villanueva */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 text-white">
                <span className="text-xl md:text-2xl font-bold">JV</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                Jhonny Villanueva
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Desarrollador Backend
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/jmvillanueva-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors transform hover:scale-110"
                  aria-label="GitHub de Jhonny Villanueva"
                >
                  <AiOutlineGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jmvillanueva-m/"
                  className="text-gray-600 hover:text-blue-700 transition-colors transform hover:scale-110"
                  aria-label="LinkedIn de Jhonny Villanueva"
                >
                  <AiOutlineLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Información de la institución */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4">
                <img
                  src={logoEsfot}
                  alt="Logo ESFOT - EPN"
                  className="w-12 h-16 mr-3 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <FaUniversity className="mr-2" />
                    ESFOT - EPN
                  </h3>
                  <p className=" text-sm">Escuela de Formación de Tecnólogos</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2">
                Repositorios
              </h3>
              <div className="flex flex-col space-y-3">
                <a
                  href="https://github.com/jmvillanueva-dev/frontend-webapp.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:translate-x-1 duration-300 transition-transform group"
                >
                  <AiOutlineGithub className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Frontend Code</span>
                </a>
                <a
                  href="https://github.com/jmvillanueva-dev/backend-webapp.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-blue-600 hover:translate-x-1 duration-300 transition-transform group"
                >
                  <AiOutlineGithub className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Backend Code</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-lg font-semibold mb-4 border-b border-blue-500 pb-2">
                Contacto
              </h3>
              <div className="text-center md:text-right">
                <p className="mb-1 text-gray-600">
                  Escuela Politécnica Nacional
                </p>
                <p className="mb-1 text-gray-600">Ladrón de Guevara E11-253</p>
                <p className="text-gray-600">
                  © {new Date().getFullYear()} Quito-Ecuador
                </p>
              </div>
            </div>
          </div>

          {/* Divider y copyright */}
          <div className="border-t border-gray-300 mt-8 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              Desarrollado por Cristian Tambaco & Jhonny Villanueva
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

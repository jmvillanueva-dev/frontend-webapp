import { useState } from "react";
import {
  AiFillHome,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import storeAuth from "../../context/storeAuth.jsx";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 shadow-sm fixed w-full z-10">
        <div
          className="absolute inset-0 opacity-20 bg-cover -z-10"
          style={{ backgroundImage: "var(--wave-background)" }}
        ></div>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <AiFillHome className="w-6 h-6 text-white mr-2" />
            <span className="text-xl font-semibold text-white">Dashboard</span>
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
                <button
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 font-medium transition-colors"
                  onClick={() => {
                    storeAuth.getState().logout();
                    window.location.href = "/";
                  }}
                >
                  <AiOutlineLogout />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <button
                  className="flex items-center gap-2 text-red-700 px-4 py-2 rounded-md hover:underline font-medium transition-colors"
                  onClick={() => {
                    storeAuth.getState().logout();
                    window.location.href = "/";
                  }}
                >
                  <FaUserCircle />
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main className="p-6">
        <h1 className="mt-15 text-2xl font-bold mb-4">
          Bienvenido al Dashboard
        </h1>
        <p className="text-gray-700">
          Aquí puedes ver tu información y gestionar tu cuenta.
        </p>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="w-10 h-10 text-amber-200" />
              </div>
            </div>
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <p className="text-blue-100 text-xl">Página no encontrada</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                ¡Ups! Algo se perdió en el camino
              </h2>
              <p className="text-gray-600 text-md mb-6">
                La página que estás buscando no existe o ha sido movida. No te
                preocupes, te ayudaremos a encontrar el camino correcto.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-8">
                <p className="text-blue-800 text-sm">
                  <strong>Posibles causas:</strong> URL incorrecta, página
                  eliminada o enlace desactualizado.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link
                to="/"
                className="flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <FaHome className="w-5 h-5" />
                Ir al Inicio Sesión
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-3 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <FaArrowLeft className="w-5 h-5" />
                Regresar
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <FaSearch className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  ¿Buscas algo específico?
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Prueba con nuestra navegación principal o contacta con soporte
                si necesitas ayuda.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/home"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Página Inicio
                </Link>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Registrarse
                </Link>
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 py-4 px-6 text-center">
            <p className="text-gray-500 text-sm">
              ¿Necesitas ayuda?{" "}
              <a
                href="mailto:whipala.studio@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Error 404 · Página no encontrada · AppWeb
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

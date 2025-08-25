import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../hooks/useFetch.js";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaEnvelope,
} from "react-icons/fa";

const EmailConfirmation = () => {
  const { token } = useParams();
  const [confirmationStatus, setConfirmationStatus] = useState("loading");
  const { fetchDataBackend } = useFetch();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:3000/api";
        const response = await fetchDataBackend(
          `${apiUrl}/users/confirm/${token}`,
          null,
          "GET"
        );

        setConfirmationStatus("success");
        toast.success(response.message || "¡Cuenta confirmada exitosamente!");
      } catch (error) {
        setConfirmationStatus("error");
        toast.error(error.message || "Error al confirmar la cuenta");
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token, fetchDataBackend]);

  const renderContent = () => {
    switch (confirmationStatus) {
      case "loading":
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Confirmando tu cuenta
            </h2>
            <p className="text-gray-600">
              Estamos verificando tu información...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ¡Cuenta Confirmada!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu dirección de email ha sido verificada correctamente. Ahora
              puedes iniciar sesión en tu cuenta.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Iniciar Sesión
            </Link>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <FaTimesCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Error de Confirmación
            </h2>
            <p className="text-gray-600 mb-4">
              El enlace de confirmación es inválido o ha expirado.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Por favor, solicita un nuevo enlace de confirmación o contacta con
              soporte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <FaArrowLeft className="mr-2" />
                Volver al Login
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
              >
                <FaEnvelope className="mr-2" />
                Reintentar
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-blue-300 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Confirmación de Email
            </h1>
          </div>

          {/* Content */}
          {renderContent()}

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              ¿Necesitas ayuda?{" "}
              <a
                href="mailto:soporte@appweb.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EmailConfirmation;

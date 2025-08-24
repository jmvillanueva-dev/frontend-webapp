import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch.js";
import storeAuth from "../../context/storeAuth.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();
  const { setUser, setToken } = storeAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await fetchDataBackend(`${apiUrl}/login`, data);

      // Guardar datos de autenticación
      setUser(response.user);
      setToken(response.token);

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700/85 via-gray-900/85 to-gray-700/85">
      <div
        className="absolute inset-0 opacity-20 bg-contain -z-10"
        style={{ backgroundImage: "var(--wave-background)" }}
      ></div>
      {/* Contenedor de formulario */}
      <div className="w-full max-w-md mx-auto">
        <div className="p-6 sm:p-8 shadow-xl rounded-lg bg-white">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-blue-700">
            Iniciar Sesión
          </h1>
          <p className="text-gray-500 block my-5 text-sm font-semibold text-center">
            Ingresa tu correo y contraseña para acceder
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Correo electrónico */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                className={`block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 py-3 px-4 text-gray-700 shadow-sm transition-all duration-300`}
                {...register("email", {
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo electrónico no válido",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div className="mb-4 relative">
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  className={`block w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 py-3 px-4 text-gray-700 shadow-sm pr-10 transition-all duration-300`}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón de iniciar sesión */}
            <div className="my-4">
              <button
                type="submit"
                disabled={isLoading}
                className="py-3 w-full text-center bg-blue-600 text-white border rounded-md hover:bg-blue-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:cursor-pointer"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </div>
          </form>

          {/* Enlaces para volver o registrarse */}
          <div className="mt-3 text-sm flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
            <Link
              to="/home"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-900 duration-300 transition-all hover:-translate-x-1 hover:scale-105"
            >
              <FaArrowLeft />
              Ir al Inicio
            </Link>
            <div className="text-center sm:text-right">
              ¿No tienes una cuenta?
              <Link
                to="/register"
                className="ml-1 font-bold text-blue-600 hover:text-blue-800 transition-colors hover:underline"
              >
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

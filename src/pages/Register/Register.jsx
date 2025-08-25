import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch.js";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { fetchDataBackend } = useFetch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { nombre, apellido, email, password, confirmPassword } = data;
      const registrationData = {
        nombre,
        apellido,
        email,
        password,
        confirmPassword,
      };

      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api";
      const response = await fetchDataBackend(
        `${apiUrl}/users/register`,
        registrationData
      );

      setSuccessMessage(
        response.message || "¡Registro exitoso! Redirigiendo..."
      );

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-700/80 via-gray-900/80 to-gray-700/80">
      <div
        className="absolute inset-0 opacity-20 bg-cover -z-10"
        style={{ backgroundImage: "var(--wave-background)" }}
      ></div>
      {/* Sección de formulario de registro */}
      <div className="w-full max-w-md mx-auto">
        <div className="p-6 sm:p-8 shadow-xl rounded-lg bg-white">
          {/* Contenedor del formulario */}
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-blue-700">
            Crea una Cuenta
          </h1>
          <p className="text-gray-500 block my-5 text-sm font-semibold text-center">
            Ingresa tus datos para registrar un nuevo usuario
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              {/* Campo para nombre */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className={`block w-full rounded-md border ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 py-3 px-4 text-gray-700 shadow-sm transition-all duration-300`}
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              {/* Campo para apellido */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tu apellido"
                  className={`block w-full rounded-md border ${
                    errors.apellido ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 py-3 px-4 text-gray-700 shadow-sm transition-all duration-300`}
                  {...register("apellido", {
                    required: "El apellido es obligatorio",
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres",
                    },
                  })}
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.apellido.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo para correo electrónico */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
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

            {/* Campo para contraseña */}
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
                {/* Botón para mostrar/ocultar la contraseña */}
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Campo para confirmar contraseña */}
            <div className="mb-4 relative">
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  className={`block w-full rounded-md border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300 py-3 px-4 text-gray-700 shadow-sm pr-10 transition-all duration-300`}
                  {...register("confirmPassword", {
                    required: "Debes confirmar tu contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                />
                {/* Botón para mostrar/ocultar la contraseña */}
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Botón para enviar el formulario */}
            <div className="my-4">
              <button
                type="submit"
                disabled={isLoading}
                className="py-3 w-full text-center bg-blue-600 text-white border rounded-md hover:bg-blue-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          {/* Enlace para iniciar sesión si ya tiene una cuenta */}
          <div className="mt-3 text-sm flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
            <Link
              to="/home"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-900 duration-300 transition-all hover:-translate-x-1 hover:scale-105"
            >
              <FaArrowLeft />
              Ir al Inicio
            </Link>
            <div className="text-center sm:text-right">
              ¿Ya estás registrado?
              <Link
                to="/"
                className="ml-1 font-bold text-blue-600 hover:text-blue-800 transition-colors hover:underline"
              >
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function EstudiantesModule() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDeleteId, setStudentToDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { fetchDataBackend } = useFetch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const data = await fetchDataBackend(`${apiUrl}/estudiantes`, null, "GET");
      setEstudiantes(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) {
        await fetchDataBackend(
          `${apiUrl}/estudiantes/${editingId}`,
          data,
          "PUT"
        );
        toast.success("Estudiante actualizado exitosamente");
      } else {
        await fetchDataBackend(`${apiUrl}/estudiantes`, data, "POST");
        toast.success("Estudiante creado exitosamente");
      }
      resetForm();
      fetchEstudiantes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (estudiante) => {
    setEditingId(estudiante.id);
    reset({
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      cedula: estudiante.cedula,
      fechaNacimiento: estudiante.fechaNacimiento,
      ciudad: estudiante.ciudad,
      direccion: estudiante.direccion,
      telefono: estudiante.telefono,
      email: estudiante.email,
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setStudentToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchDataBackend(
        `${apiUrl}/estudiantes/${studentToDeleteId}`,
        null,
        "DELETE"
      );
      toast.success("Estudiante eliminado exitosamente");
      fetchEstudiantes();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setShowDeleteModal(false);
      setStudentToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDeleteId(null);
  };

  const resetForm = () => {
    reset({
      nombre: "",
      apellido: "",
      cedula: "",
      fechaNacimiento: "",
      ciudad: "",
      direccion: "",
      telefono: "",
      email: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Función para prevenir caracteres no numéricos en los campos de teléfono y cédula
  const handleNumericInput = (e) => {
    const isNumberKey = /^[0-9]$/.test(e.key);
    const isControlKey = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ].includes(e.key);
    if (!isNumberKey && !isControlKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Estudiantes
      </h2>

      {/* Botón para abrir el modal de creación */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingId(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          <FaPlus /> Nuevo Estudiante
        </button>
      </div>

      {/* Modal para el formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? "Editar Estudiante" : "Crear Nuevo Estudiante"}
            </h3>
            <form
              onSubmit={handleSubmit(handleSave)}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {/* Campo Nombre */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  {...register("nombre", {
                    required: "El nombre es requerido.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              {/* Campo Apellido */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  {...register("apellido", {
                    required: "El apellido es requerido.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.apellido ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.apellido && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.apellido.message}
                  </p>
                )}
              </div>

              {/* Campo Cédula */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Cédula
                </label>
                <input
                  type="text"
                  {...register("cedula", {
                    required: "La cédula es requerida.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Solo se permiten números.",
                    },
                  })}
                  onKeyDown={handleNumericInput}
                  className={`p-2 border rounded-md ${
                    errors.cedula ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.cedula && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cedula.message}
                  </p>
                )}
              </div>

              {/* Campo Fecha de Nacimiento */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  {...register("fechaNacimiento", {
                    required: "La fecha de nacimiento es requerida.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.fechaNacimiento
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.fechaNacimiento && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fechaNacimiento.message}
                  </p>
                )}
              </div>

              {/* Campo Ciudad */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  {...register("ciudad", {
                    required: "La ciudad es requerida.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.ciudad ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.ciudad && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.ciudad.message}
                  </p>
                )}
              </div>

              {/* Campo Dirección */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  {...register("direccion", {
                    required: "La dirección es requerida.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.direccion ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.direccion && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.direccion.message}
                  </p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  {...register("telefono", {
                    required: "El teléfono es requerido.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Solo se permiten números.",
                    },
                  })}
                  onKeyDown={handleNumericInput}
                  className={`p-2 border rounded-md ${
                    errors.telefono ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              {/* Campo Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El email es requerido.",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Formato de email inválido.",
                    },
                  })}
                  className={`p-2 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  <FaSave /> {editingId ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 font-medium transition-colors"
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Estudiantes */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cédula
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {estudiante.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {estudiante.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {estudiante.cedula}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {estudiante.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(estudiante)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(estudiante.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <div className="flex flex-col items-center text-center">
              <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Confirmar Eliminación
              </h3>
              <p className="text-gray-600 mb-4">
                ¿Estás seguro de que quieres eliminar este estudiante?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Eliminar
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

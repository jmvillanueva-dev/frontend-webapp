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

export default function MateriasModule() {
  const [materias, setMaterias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materiaToDeleteId, setMateriaToDeleteId] = useState(null);
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
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const data = await fetchDataBackend(`${apiUrl}/materias`, null, "GET");
      setMaterias(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingId) {
        await fetchDataBackend(`${apiUrl}/materias/${editingId}`, data, "PUT");
        toast.success("Materia actualizada exitosamente");
      } else {
        await fetchDataBackend(`${apiUrl}/materias`, data, "POST");
        toast.success("Materia creada exitosamente");
      }
      resetForm();
      fetchMaterias();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (materia) => {
    setEditingId(materia.id);
    reset({
      nombre: materia.nombre,
      codigo: materia.codigo,
      descripcion: materia.descripcion,
      creditos: materia.creditos.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setMateriaToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchDataBackend(
        `${apiUrl}/materias/${materiaToDeleteId}`,
        null,
        "DELETE"
      );
      toast.success("Materia eliminada exitosamente");
      fetchMaterias();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteModal(false);
      setMateriaToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMateriaToDeleteId(null);
  };

  const resetForm = () => {
    reset({
      nombre: "",
      codigo: "",
      descripcion: "",
      creditos: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Materias
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
          <FaPlus /> Nueva Materia
        </button>
      </div>

      {/* Modal para el formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? "Editar Materia" : "Crear Nueva Materia"}
            </h3>
            <form
              onSubmit={handleSubmit(handleSave)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

              {/* Campo Código */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  {...register("codigo", {
                    required: "El código es requerido.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.codigo ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.codigo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.codigo.message}
                  </p>
                )}
              </div>

              {/* Campo Descripción */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  {...register("descripcion")}
                  className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              {/* Campo Créditos */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Créditos
                </label>
                <input
                  type="text"
                  {...register("creditos", {
                    required: "Los créditos son requeridos.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números.",
                    },
                  })}
                  className={`p-2 border rounded-md ${
                    errors.creditos ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.creditos && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.creditos.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
                >
                  <FaSave /> {editingId ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors font-medium"
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Materias */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Créditos
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {materias.map((materia) => (
              <tr key={materia.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {materia.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {materia.codigo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {materia.creditos}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(materia)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(materia.id)}
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
                ¿Estás seguro de que quieres eliminar esta materia?
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

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

export default function MatriculasModule() {
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [matriculaToDeleteId, setMatriculaToDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const { fetchDataBackend } = useFetch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Configuración de react-hook-form para la validación del formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Obtener todas las matrículas, estudiantes y materias
      const [matriculasData, estudiantesData, materiasData] = await Promise.all(
        [
          fetchDataBackend(`${apiUrl}/matriculas`, null, "GET"),
          fetchDataBackend(`${apiUrl}/estudiantes`, null, "GET"),
          fetchDataBackend(`${apiUrl}/materias`, null, "GET"),
        ]
      );
      setMatriculas(matriculasData);
      setEstudiantes(estudiantesData);
      setMaterias(materiasData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSave = async (data) => {
    try {
      // Convertir campos numéricos de string a number antes de enviar
      const payload = {
        ...data,
        codigo: Number(data.codigo),
        estudianteId: Number(data.estudianteId),
        materiaId: Number(data.materiaId),
      };

      if (editingId) {
        await fetchDataBackend(
          `${apiUrl}/matriculas/${editingId}`,
          payload,
          "PUT"
        );
        toast.success("Matrícula actualizada exitosamente");
      } else {
        await fetchDataBackend(`${apiUrl}/matriculas`, payload, "POST");
        toast.success("Matrícula creada exitosamente");
      }
      resetForm();
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (matricula) => {
    setEditingId(matricula.id);
    // Usar reset para precargar los datos de la matrícula en el formulario
    reset({
      codigo: matricula.codigo,
      descripcion: matricula.descripcion,
      estudianteId: matricula.estudianteId.toString(),
      materiaId: matricula.materiaId.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setMatriculaToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetchDataBackend(
        `${apiUrl}/matriculas/${matriculaToDeleteId}`,
        null,
        "DELETE"
      );
      toast.success("Matrícula eliminada exitosamente");
      fetchData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      // Cerrar el modal de eliminación y limpiar el estado
      setShowDeleteModal(false);
      setMatriculaToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMatriculaToDeleteId(null);
  };

  const resetForm = () => {
    reset({
      codigo: "",
      descripcion: "",
      estudianteId: "",
      materiaId: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Matrículas
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
          <FaPlus /> Nueva Matrícula
        </button>
      </div>

      {/* Modal para el formulario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? "Editar Matrícula" : "Crear Nueva Matrícula"}
            </h3>
            <form
              onSubmit={handleSubmit(handleSave)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Campo Código */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  {...register("codigo", {
                    required: "El código es requerido.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números.",
                    },
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
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <input
                  type="text"
                  {...register("descripcion", {
                    required: "La descripción es requerida.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.descripcion ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.descripcion && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>

              {/* Campo Estudiante */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Estudiante
                </label>
                <select
                  {...register("estudianteId", {
                    required: "El estudiante es requerido.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.estudianteId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione un estudiante</option>
                  {estudiantes.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} {est.apellido}
                    </option>
                  ))}
                </select>
                {errors.estudianteId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.estudianteId.message}
                  </p>
                )}
              </div>

              {/* Campo Materia */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Materia
                </label>
                <select
                  {...register("materiaId", {
                    required: "La materia es requerida.",
                  })}
                  className={`p-2 border rounded-md ${
                    errors.materiaId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.nombre} ({mat.codigo})
                    </option>
                  ))}
                </select>
                {errors.materiaId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.materiaId.message}
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
                  className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 font-medium transition-colors"
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de Matrículas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estudiante
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Materia
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matriculas.map((matricula) => (
              <tr key={matricula.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {matricula.codigo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {matricula.estudiante.nombre} {matricula.estudiante.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {matricula.materia.nombre} ({matricula.materia.codigo})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {matricula.descripcion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(matricula)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(matricula.id)}
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
                ¿Estás seguro de que quieres eliminar esta matrícula?
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

import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function MatriculasModule() {
  const [matriculas, setMatriculas] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [matriculaData, setMatriculaData] = useState({
    codigo: "",
    descripcion: "",
    estudianteId: "",
    materiaId: "",
  });
  const [editingId, setEditingId] = useState(null);
  const { fetchDataBackend } = useFetch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const matriculasData = await fetchDataBackend(
        `${apiUrl}/matriculas`,
        null,
        "GET"
      );
      const estudiantesData = await fetchDataBackend(
        `${apiUrl}/estudiantes`,
        null,
        "GET"
      );
      const materiasData = await fetchDataBackend(
        `${apiUrl}/materias`,
        null,
        "GET"
      );

      setMatriculas(matriculasData);
      setEstudiantes(estudiantesData);
      setMaterias(materiasData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMatriculaData({ ...matriculaData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...matriculaData,
        codigo: parseInt(matriculaData.codigo),
        estudianteId: parseInt(matriculaData.estudianteId),
        materiaId: parseInt(matriculaData.materiaId),
      };
      if (editingId) {
        // Update
        await fetchDataBackend(
          `${apiUrl}/matriculas/${editingId}`,
          data,
          "PUT"
        );
        toast.success("Matrícula actualizada exitosamente");
      } else {
        // Create
        await fetchDataBackend(`${apiUrl}/matriculas`, data, "POST");
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
    setMatriculaData({
      codigo: matricula.codigo,
      descripcion: matricula.descripcion,
      estudianteId: matricula.estudianteId,
      materiaId: matricula.materiaId,
    });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta matrícula?")
    ) {
      try {
        await fetchDataBackend(`${apiUrl}/matriculas/${id}`, null, "DELETE");
        toast.success("Matrícula eliminada exitosamente");
        fetchData();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const resetForm = () => {
    setMatriculaData({
      codigo: "",
      descripcion: "",
      estudianteId: "",
      materiaId: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Matrículas
      </h2>

      {/* Formulario de Creación/Edición */}
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-md shadow-inner"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Código
          </label>
          <input
            type="number"
            name="codigo"
            value={matriculaData.codigo}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            name="descripcion"
            value={matriculaData.descripcion}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Estudiante
          </label>
          <select
            name="estudianteId"
            value={matriculaData.estudianteId}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="">Seleccione un estudiante</option>
            {estudiantes.map((est) => (
              <option key={est.id} value={est.id}>
                {est.nombre} {est.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Materia
          </label>
          <select
            name="materiaId"
            value={matriculaData.materiaId}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="">Seleccione una materia</option>
            {materias.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.nombre} ({mat.codigo})
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            <FaSave />{" "}
            {editingId ? "Actualizar Matrícula" : "Guardar Matrícula"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 font-medium transition-colors"
            >
              <FaTimes /> Cancelar
            </button>
          )}
        </div>
      </form>

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
                      onClick={() => handleDelete(matricula.id)}
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
    </div>
  );
}

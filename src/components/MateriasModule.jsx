import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function MateriasModule() {
  const [materias, setMaterias] = useState([]);
  const [materiaData, setMateriaData] = useState({
    nombre: "",
    codigo: "",
    descripcion: "",
    creditos: "",
  });
  const [editingId, setEditingId] = useState(null);
  const { fetchDataBackend } = useFetch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMateriaData({ ...materiaData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await fetchDataBackend(
          `${apiUrl}/materias/${editingId}`,
          materiaData,
          "PUT"
        );
        toast.success("Materia actualizada exitosamente");
      } else {
        // Create
        await fetchDataBackend(`${apiUrl}/materias`, materiaData, "POST");
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
    setMateriaData({
      nombre: materia.nombre,
      codigo: materia.codigo,
      descripcion: materia.descripcion,
      creditos: materia.creditos,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta materia?")) {
      try {
        await fetchDataBackend(`${apiUrl}/materias/${id}`, null, "DELETE");
        toast.success("Materia eliminada exitosamente");
        fetchMaterias();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const resetForm = () => {
    setMateriaData({ nombre: "", codigo: "", descripcion: "", creditos: "" });
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Materias
      </h2>

      {/* Formulario de Creación/Edición */}
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-md shadow-inner"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={materiaData.nombre}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Código
          </label>
          <input
            type="text"
            name="codigo"
            value={materiaData.codigo}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Créditos
          </label>
          <input
            type="text"
            name="creditos"
            value={materiaData.creditos}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={materiaData.descripcion || ""}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            <FaSave /> {editingId ? "Actualizar Materia" : "Guardar Materia"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors font-medium"
            >
              <FaTimes /> Cancelar
            </button>
          )}
        </div>
      </form>

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
                      onClick={() => handleDelete(materia.id)}
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

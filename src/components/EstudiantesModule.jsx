import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function EstudiantesModule() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteData, setEstudianteData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fechaNacimiento: "",
    ciudad: "",
    direccion: "",
    telefono: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null);
  const { fetchDataBackend } = useFetch();

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEstudianteData({ ...estudianteData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await fetchDataBackend(
          `${apiUrl}/estudiantes/${editingId}`,
          estudianteData,
          "PUT"
        );
        toast.success("Estudiante actualizado exitosamente");
      } else {
        // Create
        await fetchDataBackend(`${apiUrl}/estudiantes`, estudianteData, "POST");
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
    setEstudianteData({
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      cedula: estudiante.cedula,
      fechaNacimiento: estudiante.fechaNacimiento,
      ciudad: estudiante.ciudad,
      direccion: estudiante.direccion,
      telefono: estudiante.telefono,
      email: estudiante.email,
    });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este estudiante?")
    ) {
      try {
        await fetchDataBackend(`${apiUrl}/estudiantes/${id}`, null, "DELETE");
        toast.success("Estudiante eliminado exitosamente");
        fetchEstudiantes();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const resetForm = () => {
    setEstudianteData({
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
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Gestión de Estudiantes
      </h2>

      {/* Formulario de Creación/Edición */}
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-4 border rounded-md shadow-inner"
      >
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={estudianteData.nombre}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            value={estudianteData.apellido}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Cédula
          </label>
          <input
            type="text"
            name="cedula"
            value={estudianteData.cedula}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Fecha de Nacimiento
          </label>
          <input
            type="text"
            name="fechaNacimiento"
            value={estudianteData.fechaNacimiento}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <input
            type="text"
            name="ciudad"
            value={estudianteData.ciudad}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={estudianteData.direccion}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={estudianteData.telefono}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={estudianteData.email}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
            required
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            <FaSave />{" "}
            {editingId ? "Actualizar Estudiante" : "Guardar Estudiante"}
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
                      onClick={() => handleDelete(estudiante.id)}
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

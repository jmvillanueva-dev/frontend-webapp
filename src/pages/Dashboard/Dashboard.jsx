import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import {
  FaUserCircle,
  FaBook,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import storeAuth from "../../context/storeAuth.jsx";
import MateriasModule from "../../components/MateriasModule.jsx";
import EstudiantesModule from "../../components/EstudiantesModule.jsx";
import MatriculasModule from "../../components/MatriculasModule.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WelcomeSection = ({ userName, setActiveModule }) => (
  <div className="flex flex-col gap-6">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        ¡Bienvenido, {userName}! 👋
      </h2>
      <p className="text-gray-600">
        Desde aquí puedes gestionar todos los módulos de tu aplicación.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <FaUsers className="text-blue-500 text-4xl mb-3" />
        <h3 className="text-xl font-semibold mb-2">Crear Estudiante</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Añade nuevos estudiantes al sistema.
        </p>
        <button
          onClick={() => setActiveModule("estudiantes")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Ir a Estudiantes
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <FaBook className="text-green-500 text-4xl mb-3" />
        <h3 className="text-xl font-semibold mb-2">Crear Materia</h3>
        <p className="text-gray-600 mb-4 text-sm">Registra nuevas materias.</p>
        <button
          onClick={() => setActiveModule("materias")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Ir a Materias
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <FaClipboardList className="text-purple-500 text-4xl mb-3" />
        <h3 className="text-xl font-semibold mb-2">Registrar Matrícula</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Inscribe estudiantes en materias.
        </p>
        <button
          onClick={() => setActiveModule("matriculas")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          Ir a Matrículas
        </button>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, logout } = storeAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState("welcome");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const renderModule = () => {
    switch (activeModule) {
      case "materias":
        return <MateriasModule />;
      case "estudiantes":
        return <EstudiantesModule />;
      case "matriculas":
        return <MatriculasModule />;
      default:
        return (
          <WelcomeSection
            userName={user?.nombre}
            setActiveModule={setActiveModule}
          />
        );
    }
  };

  const menuItems = [
    { id: "welcome", label: "Inicio", icon: <FaUserCircle /> },
    { id: "materias", label: "Materias", icon: <FaBook /> },
    { id: "estudiantes", label: "Estudiantes", icon: <FaUsers /> },
    { id: "matriculas", label: "Matrículas", icon: <FaClipboardList /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar para desktop */}
      <aside className={`bg-gray-800 text-white w-64 p-6 hidden md:block`}>
        <div className="flex items-center gap-3 mb-8">
          <FaUserCircle className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`flex items-center gap-2 w-full text-left p-3 rounded-lg transition-colors ${
                    activeModule === item.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left p-3 rounded-lg bg-rose-500 hover:bg-rose-700 transition-colors font-medium"
          >
            <AiOutlineLogout />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header para mobile */}
        <header className="bg-gray-800 text-white shadow-md md:hidden sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaUserCircle className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-semibold">Dashboard</span>
            </div>
            <button
              className="p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <AiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </header>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-40 bg-gray-800 text-white p-4 md:hidden animate-slide-down">
            <nav>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <button
                      onClick={() => {
                        setActiveModule(item.id);
                        toggleMenu();
                      }}
                      className="flex items-center gap-2 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 w-full text-left p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-medium"
            >
              <AiOutlineLogout />
              Cerrar sesión
            </button>
          </div>
        )}

        <main className="p-6 flex-1 overflow-y-auto">{renderModule()}</main>
      </div>

      <ToastContainer
        position="bottom-right"
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
}

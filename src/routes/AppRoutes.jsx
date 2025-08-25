import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound .jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import EmailConfirmation from "../pages/EmailConfirmation/EmailConfirmation.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import PublicRoute from "./PublicRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm/:token" element={<EmailConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="dashboard/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<Dashboard />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

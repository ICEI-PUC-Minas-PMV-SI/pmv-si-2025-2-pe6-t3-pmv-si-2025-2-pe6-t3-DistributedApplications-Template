import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/Login";
import UsuarioCreate from "../pages/UsuarioCreate";
import { useAuth } from "../context/AuthProvider";

function Home() {
  const { user, logout, isAdmin } = useAuth();
  return (
    <div style={{ padding: 16 }}>
      <h1>🏨 Hotel Fazenda – Dashboard</h1>
      <p>Bem-vindo{user?.nome ? `, ${user.nome}` : ""}!</p>

      {isAdmin && (
        <p>
          <Link to="/admin/usuarios/novo">+ Cadastrar usuário (Gerente/Garçom)</Link>
        </p>
      )}

      <p><Link to="/login" onClick={logout}>Sair</Link></p>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },

  // rota protegida normal
  { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },

  // rotas apenas para Administrador
  {
    path: "/admin/usuarios/novo",
    element: (
      <AdminRoute>
        <UsuarioCreate />
      </AdminRoute>
    ),
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

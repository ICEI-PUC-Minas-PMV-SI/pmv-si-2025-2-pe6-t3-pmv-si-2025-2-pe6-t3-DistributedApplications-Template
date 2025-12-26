// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import UsuarioCreate from "./pages/UsuarioCreate.jsx";
import Home from "./pages/Home.jsx";
import EsqueciSenha from "./pages/EsqueciSenha.jsx";
import Produtos from "./pages/Produtos.jsx";
import RotaPrivada from "./routes/RotaPrivada.jsx";
import ProdutoCreate from "./pages/ProdutoCreate.jsx";
import Quartos from "./pages/Quartos.jsx";
import QuartosCheckin from "./pages/QuartosCheckin.jsx";
import Reservas from "./pages/Reservas.jsx";
import ReservaNova from "./pages/ReservaNova.jsx";
import ContaHospedagem from "./pages/ContaHospedagem.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import PedidoCreate from "./pages/PedidosCreate.jsx";
import ReservaEncerrar from "./pages/ReservaEncerrar.jsx";

export default function App() {
  return (
    <Routes>
      {/* Página principal do sistema */}
      <Route
        path="/"
        element={
          <RotaPrivada>
            <Home />
          </RotaPrivada>
        }
      />

      {/* Acesso */}
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="reservas/encerrar/:id" element={<ReservaEncerrar />} />


      {/* Usuários */}
      <Route
        path="/usuarios/novo"
        element={
          <RotaPrivada>
            <UsuarioCreate />
          </RotaPrivada>
        }
      />

      {/* Produtos */}
      <Route
        path="/produtos"
        element={
          <RotaPrivada>
            <Produtos />
          </RotaPrivada>
        }
      />
      <Route
        path="/produtos/novo"
        element={
          <RotaPrivada>
            <ProdutoCreate />
          </RotaPrivada>
        }
      />

      {/* Quartos */}
      <Route
        path="/quartos"
        element={
          <RotaPrivada>
            <Quartos />
          </RotaPrivada>
        }
      />
      <Route
        path="/quartos/checkin/:quartoId"
        element={
          <RotaPrivada>
            <QuartosCheckin />
          </RotaPrivada>
        }
      />

      {/* Reservas */}
      <Route
        path="/reservas"
        element={
          <RotaPrivada>
            <Reservas />
          </RotaPrivada>
        }
      />
      <Route
        path="/reservas/nova"
        element={
          <RotaPrivada>
            <ReservaNova />
          </RotaPrivada>
        }
      />

      {/* Conta/Hospedagem – DUAS rotas: com id e sem id (fallback por query) */}
      <Route
        path="/conta"
        element={
          <RotaPrivada>
            <ContaHospedagem />
          </RotaPrivada>
        }
      />
      <Route
        path="/conta/:hospedagemId"
        element={
          <RotaPrivada>
            <ContaHospedagem />
          </RotaPrivada>
        }
      />

      {/* Pedidos */}
      <Route
        path="/pedidos"
        element={
          <RotaPrivada>
            <Pedidos />
          </RotaPrivada>
        }
      />
      <Route
        path="/pedidos/novo"
        element={
          <RotaPrivada>
            <PedidoCreate />
          </RotaPrivada>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

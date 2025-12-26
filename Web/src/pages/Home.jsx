// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import logoHF from "../assets/logoHF.png";
import addUsuario from "../assets/addUsuario.png";
import produto from "../assets/produto.png";
import pedido from "../assets/pedido.png";
import quarto from "../assets/quarto.png";
import reservaIcon from "../assets/reserva.png";
import "../pages/Home.css";

function getUsuario() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export default function Home() {
  const usuario = getUsuario();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="hf-root">
      <div className="hf-card">
        <div className="hf-hero">
          <img src={logoHF} alt="Logo Hotel Fazenda" className="hf-logo" />

          <div className="hf-hero-text">
            <h1>Sistema de Gestão — Hotel Fazenda</h1>
            <p className="hf-hero-sub">
              Bem-vindo(a), {usuario?.nome || "usuário"} 👋
            </p>
          </div>

          {/* Botão de sair no canto direito */}
          <button className="hf-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>

        {/* BODY */}
        <div className="hf-body">
          <p className="hf-intro">Escolha uma opção para começar:</p>

          <nav className="hf-grid" aria-label="Atalhos do sistema">
            <Link to="/quartos" className="hf-cardlink">
              <span className="hf-iconbox">
                <img src={quarto} alt="" width={22} height={22} className="hf-icon" loading="lazy" />
              </span>
              <span className="hf-cardtext">
                <span className="hf-cardtitle">Quartos</span>
                <span className="hf-cardsub">Acomodar hóspedes e visualizar status</span>
              </span>
              <span className="hf-arrow" aria-hidden>→</span>
            </Link>

            <Link to="/reservas" className="hf-cardlink">
              <span className="hf-iconbox">
                <img src={reservaIcon} alt="Reservas" className="hf-icon" width={22} height={22} loading="lazy" />
              </span>
              <span className="hf-cardtext">
                <span className="hf-cardtitle">Reservas</span>
                <span className="hf-cardsub">Criar, consultar e confirmar hospedagens</span>
              </span>
              <span className="hf-arrow" aria-hidden>→</span>
            </Link>

            <Link to="/usuarios/novo" className="hf-cardlink">
              <span className="hf-iconbox">
                <img src={addUsuario} alt="" width={22} height={22} className="hf-icon" loading="lazy" />
              </span>
              <span className="hf-cardtext">
                <span className="hf-cardtitle">Cadastrar usuário</span>
                <span className="hf-cardsub">Criar acesso para a equipe</span>
              </span>
              <span className="hf-arrow" aria-hidden>→</span>
            </Link>

            <Link to="/produtos" className="hf-cardlink">
              <span className="hf-iconbox">
                <img src={produto} alt="" width={22} height={22} className="hf-icon" loading="lazy" />
              </span>
              <span className="hf-cardtext">
                <span className="hf-cardtitle">Produtos</span>
                <span className="hf-cardsub">Gerenciar cardápio e itens do restaurante</span>
              </span>
              <span className="hf-arrow" aria-hidden>→</span>
            </Link>

            <Link to="/pedidos" className="hf-cardlink">
              <span className="hf-iconbox">
                <img src={pedido} alt="" width={22} height={22} className="hf-icon" loading="lazy" />
              </span>
              <span className="hf-cardtext">
                <span className="hf-cardtitle">Pedidos</span>
                <span className="hf-cardsub">Registrar consumos e entregas</span>
              </span>
              <span className="hf-arrow" aria-hidden>→</span>
            </Link>
          </nav>

          <div className="hf-footer">
            {/* Removido o link de "Esqueci minha senha" da Home */}
            <span className="hf-copy">
              © {new Date().getFullYear()} Hotel Fazenda
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch {
    user = null;
  }

  return (
    <div className="nav-wrap">
      <Link to="/" className="brand">
        <span className="brand-mark">MS</span>
        <span>models S.A</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/modelos">Modelos</NavLink>
        <NavLink to="/seja-modelo">Seja modelo</NavLink>
        <NavLink to="/anuncie">Anuncie</NavLink>
        <NavLink to="/contato">Contato</NavLink>
      </nav>

      <div className="nav-links">
        {user ? (
          <span className="pill">Ola, {user.displayName || "Usuario"}</span>
        ) : (
          <>
            <NavLink to="/login">Entrar</NavLink>
            <NavLink to="/cadastro">Cadastro</NavLink>
          </>
        )}
        <NavLink to="/seja-modelo" className="nav-cta">
          Quero anunciar
        </NavLink>
      </div>
    </div>
  );
}

import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const readUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    readUser();
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "user") {
        readUser();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const mainLinks = [
    { to: "/", label: "Inicio" },
    { to: "/modelos", label: "Modelos" },
    { to: "/seja-modelo", label: "Seja modelo" },
    { to: "/anuncie", label: "Anuncie" },
    { to: "/contato", label: "Contato" },
  ];

  return (
    <>
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">MS</span>
          <span>models S.A</span>
        </Link>

        <nav className="nav-links">
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-links">
          {user ? (
            <>
              <span className="pill">Ola, {user.displayName || "Usuario"}</span>
              {user.role === "ADMIN" ? (
                <NavLink to="/admin/aprovacoes">Admin</NavLink>
              ) : null}
              {user.role === "MODEL" ? (
                <>
                  <NavLink to="/modelo/area">Minha conta</NavLink>
                  <NavLink to="/modelo/estatisticas">Estatisticas</NavLink>
                </>
              ) : null}
              <button className="pill" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Entrar</NavLink>
              <NavLink to="/cadastro">Cadastro</NavLink>
              <NavLink to="/modelo/login">Area da modelo</NavLink>
            </>
          )}
          <NavLink to="/seja-modelo" className="nav-cta">
            Quero anunciar
          </NavLink>
        </div>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile${mobileOpen ? " open" : ""}`}>
        <div className="nav-mobile-links">
          {mainLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
              {link.label}
            </NavLink>
          ))}

          <div className="nav-mobile-divider" />

          {user ? (
            <>
              <span className="pill">Ola, {user.displayName || "Usuario"}</span>
              {user.role === "ADMIN" ? (
                <NavLink to="/admin/aprovacoes" onClick={() => setMobileOpen(false)}>
                  Admin
                </NavLink>
              ) : null}
              {user.role === "MODEL" ? (
                <>
                  <NavLink to="/modelo/area" onClick={() => setMobileOpen(false)}>
                    Minha conta
                  </NavLink>
                  <NavLink to="/modelo/estatisticas" onClick={() => setMobileOpen(false)}>
                    Estatisticas
                  </NavLink>
                </>
              ) : null}
              <button className="pill" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMobileOpen(false)}>
                Entrar
              </NavLink>
              <NavLink to="/cadastro" onClick={() => setMobileOpen(false)}>
                Cadastro
              </NavLink>
              <NavLink to="/modelo/login" onClick={() => setMobileOpen(false)}>
                Area da modelo
              </NavLink>
            </>
          )}
          <NavLink to="/seja-modelo" className="nav-cta" onClick={() => setMobileOpen(false)}>
            Quero anunciar
          </NavLink>
        </div>
      </div>
    </>
  );
}

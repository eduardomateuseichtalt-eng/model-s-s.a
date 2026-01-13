import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function ModelProfile() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(`/api/models/${id}`)
      .then((data) => setModel(data))
      .catch(() => setModel(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="page">
        <p>Modelo nao encontrada.</p>
        <div className="form-actions">
          <Link to="/modelos" className="btn btn-outline">
            Voltar para modelos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="profile">
        <div className="profile-cover">
          <img
            className="model-photo"
            src={model.coverUrl || model.avatarUrl || "/model-placeholder.svg"}
            alt={model.name}
          />
        </div>

        <div className="profile-card">
          <p className="pill">{model.city || "Brasil"}</p>
          <h1 style={{ marginTop: 12 }}>{model.name}</h1>
          <p className="muted" style={{ marginTop: 10 }}>
            {model.bio || "Perfil exclusivo. Entre em contato para mais detalhes."}
          </p>

          <div className="profile-stats">
            <div className="stat">
              <strong>{model.height || "--"}</strong>
              <span>Altura</span>
            </div>
            <div className="stat">
              <strong>{model.weight || "--"}</strong>
              <span>Peso</span>
            </div>
            <div className="stat">
              <strong>{model.priceHour || "--"}</strong>
              <span>Por hora</span>
            </div>
          </div>

          <div className="divider" />

          <p className="muted" style={{ marginBottom: 12 }}>
            Contato e redes
          </p>
          <div className="tag-list">
            <span className="pill">{model.instagram || "@model"}</span>
            <span className="pill">{model.whatsapp || "WhatsApp"}</span>
          </div>

          <div className="form-actions">
            <button className="btn">Entrar em contato</button>
            <Link to="/contato" className="btn btn-outline">
              Falar com agencia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

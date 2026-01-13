import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function AdminApprovals() {
  const [pendingModels, setPendingModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiFetch("/api/models/pending")
      .then((data) => setPendingModels(data))
      .catch((err) => setError(err.message || "Erro ao carregar pendentes."))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (modelId) => {
    setMessage("");
    setError("");
    try {
      await apiFetch(`/api/models/${modelId}/approve`, { method: "PATCH" });
      setPendingModels((current) =>
        current.filter((model) => model.id !== modelId)
      );
      setMessage("Modelo aprovado com sucesso.");
    } catch (err) {
      setError(err.message || "Erro ao aprovar modelo.");
    }
  };

  return (
    <div className="page">
      <h1 className="section-title">
        Aprovacoes de <span>modelos</span>
      </h1>
      <p className="muted" style={{ marginTop: 10 }}>
        Aprove cadastros pendentes para publica-los na vitrine.
      </p>

      {message && <div className="notice">{message}</div>}
      {error && <div className="notice">{error}</div>}

      {loading ? (
        <p style={{ marginTop: 24 }}>Carregando pendentes...</p>
      ) : pendingModels.length === 0 ? (
        <p style={{ marginTop: 24 }} className="muted">
          Nenhum cadastro pendente no momento.
        </p>
      ) : (
        <div className="cards" style={{ marginTop: 24 }}>
          {pendingModels.map((model) => (
            <div className="card" key={model.id}>
              <h4>{model.name}</h4>
              <p className="muted">{model.email}</p>
              <p className="muted">{model.city || "Cidade nao informada"}</p>
              <button
                className="btn"
                type="button"
                onClick={() => handleApprove(model.id)}
              >
                Aprovar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

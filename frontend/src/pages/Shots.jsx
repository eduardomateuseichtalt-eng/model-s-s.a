import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function Shots() {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const loadShots = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/shots");
      setShots(data);
    } catch (err) {
      setError(err.message || "Nao foi possivel carregar os shots.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShots();
  }, []);

  const toggleLike = async (shotId, likedByUser) => {
    setActionMessage("");
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setActionMessage("Faca login para curtir os shots.");
      return;
    }

    try {
      const response = await apiFetch(`/api/shots/${shotId}/like`, {
        method: likedByUser ? "DELETE" : "POST",
      });

      setShots((prev) =>
        prev.map((shot) =>
          shot.id === shotId
            ? {
                ...shot,
                likedByUser: response.liked,
                likeCount: response.likeCount,
              }
            : shot
        )
      );
    } catch (err) {
      setActionMessage(err.message || "Nao foi possivel atualizar a curtida.");
    }
  };

  return (
    <div className="page">
      <h1 className="section-title">
        Models <span>shots</span>
      </h1>
      <p className="muted" style={{ marginTop: 10 }}>
        Videos curtos de ate 5 segundos. Curta os seus favoritos.
      </p>
      {actionMessage && <p className="notice">{actionMessage}</p>}

      {loading ? (
        <p style={{ marginTop: 24 }}>Carregando shots...</p>
      ) : error ? (
        <p className="notice">{error}</p>
      ) : (
        <div className="models-grid">
          {shots.map((shot) => (
            <div key={shot.id} className="model-card shot-card">
              {shot.videoUrl ? (
                <video
                  className="model-photo"
                  src={shot.videoUrl}
                  poster={shot.posterUrl || undefined}
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
              ) : (
                <div className="model-photo shot-placeholder">
                  Video curto (ate 5s)
                </div>
              )}
              <div className="model-info">
                <h3>{shot.model?.name || "Modelo"}</h3>
                <p>{shot.model?.city || "Brasil"}</p>
                <div className="shot-actions">
                  <button
                    className={`btn ${shot.likedByUser ? "" : "btn-outline"}`}
                    type="button"
                    onClick={() => toggleLike(shot.id, shot.likedByUser)}
                  >
                    {shot.likedByUser ? "Curtido" : "Curtir"}
                  </button>
                  <span className="muted">
                    {shot.likeCount} curtidas
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { apiFetch } from "../lib/api";

const initialForm = {
  name: "",
  email: "",
  password: "",
  age: "",
  city: "",
  bio: "",
  avatarUrl: "",
  coverUrl: "",
  instagram: "",
  whatsapp: "",
  height: "",
  weight: "",
  bust: "",
  waist: "",
  hips: "",
  priceHour: "",
};

export default function ModelRegister() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (Number(form.age) < 18) {
      setMessage("Cadastro permitido apenas para maiores de 18 anos.");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/api/models/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          height: form.height ? Number(form.height) : null,
          weight: form.weight ? Number(form.weight) : null,
          bust: form.bust ? Number(form.bust) : null,
          waist: form.waist ? Number(form.waist) : null,
          hips: form.hips ? Number(form.hips) : null,
          priceHour: form.priceHour ? Number(form.priceHour) : null,
        }),
      });

      setMessage("Cadastro enviado. Aguarde aprovacao.");
      setForm(initialForm);
    } catch (error) {
      setMessage(error.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-tight">
      <div className="form-shell">
        <h2>Seja modelo</h2>
        <p className="muted">
          Preencha seus dados para analise. Enviamos retorno por email.
        </p>

        {message && <div className="notice">{message}</div>}

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            className="input"
            name="name"
            placeholder="Nome artistico"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="age"
            type="number"
            placeholder="Idade"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="city"
            placeholder="Cidade"
            value={form.city}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            name="bio"
            placeholder="Descricao do perfil"
            value={form.bio}
            onChange={handleChange}
          />
          <input
            className="input"
            name="avatarUrl"
            placeholder="Foto de perfil (URL)"
            value={form.avatarUrl}
            onChange={handleChange}
          />
          <input
            className="input"
            name="coverUrl"
            placeholder="Foto de capa (URL)"
            value={form.coverUrl}
            onChange={handleChange}
          />
          <input
            className="input"
            name="instagram"
            placeholder="Instagram"
            value={form.instagram}
            onChange={handleChange}
          />
          <input
            className="input"
            name="whatsapp"
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
          />
          <div className="form-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <input
              className="input"
              name="height"
              placeholder="Altura (cm)"
              value={form.height}
              onChange={handleChange}
            />
            <input
              className="input"
              name="weight"
              placeholder="Peso (kg)"
              value={form.weight}
              onChange={handleChange}
            />
            <input
              className="input"
              name="bust"
              placeholder="Busto (cm)"
              value={form.bust}
              onChange={handleChange}
            />
            <input
              className="input"
              name="waist"
              placeholder="Cintura (cm)"
              value={form.waist}
              onChange={handleChange}
            />
            <input
              className="input"
              name="hips"
              placeholder="Quadril (cm)"
              value={form.hips}
              onChange={handleChange}
            />
            <input
              className="input"
              name="priceHour"
              placeholder="Valor por hora"
              value={form.priceHour}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar cadastro"}
            </button>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => setForm(initialForm)}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

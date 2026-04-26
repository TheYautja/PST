import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import '../assets/styles/forms.css'

export default function CadastroPlanta() {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    genero: "",
    especie: "",
    description: "",
    image: "",
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const plantData = {
      nome_comum: form.name,
      nome_genero: form.genero,
      descricao: form.description,
      imagem_url: form.image,
      id_usuario: user?.id || 1
    };

    axios.post("http://localhost:8000/plants", plantData)
      .then(response => {
        console.log("Planta cadastrada com sucesso:", response.data);
        navigate("/maps");
      })
      .catch(err => {
        console.error("Erro ao cadastrar planta:", err);
        setError(err.response?.data?.error || "Erro ao cadastrar planta");
        setLoading(false);
      });
  }

  return (
    <div className="box">
    <button onClick={() => navigate(-1)} className="btnVoltar">
      ← 
    </button>
    <div className="plant-container">
      <div className="plant-box">
        <h1>Cadastrar Planta</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome comum"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <input
            name="genero"
            placeholder="Gênero"
            value={form.genero}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="especie"
            placeholder="Espécie"
            value={form.especie}
            onChange={handleChange}
            disabled={loading}
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            name="image"
            placeholder="URL da imagem"
            value={form.image}
            onChange={handleChange}
            disabled={loading}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
     </div>
    </div>
  );
}

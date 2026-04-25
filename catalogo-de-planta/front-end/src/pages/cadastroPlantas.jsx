import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../assets/styles/forms.css'

export default function CadastroPlanta() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const [form, setForm] = useState({
    name: "",
    genero: "",
    especie: "",
    description: "",
    image: "",
    lat: "",
    lng: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      ...form,
      id: Date.now(),
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      author: "Usuário"
    };

    console.log(newPlant);

    navigate("/maps");
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Cadastrar Planta</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome comum"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="genero"
            placeholder="Gênero"
            value={form.genero}
            onChange={handleChange}
          />

          <input
            name="especie"
            placeholder="Espécie"
            value={form.especie}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="URL da imagem"
            value={form.image}
            onChange={handleChange}
          />

          <input
            name="lat"
            type="number"
            step="any"
            placeholder="Latitude"
            value={form.lat}
            onChange={handleChange}
            required
          />

          <input
            name="lng"
            type="number"
            step="any"
            placeholder="Longitude"
            value={form.lng}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/maps.css";


const initialMarkers = [
  {
  id: 1,
  name: "Marker 1",
  lat: -23.55,
  lng: -46.63,
  image: "https://via.placeholder.com/300",
  description: "Descrição exemplo",
  author: "Usuário"
},
  { id: 2, 
    name: "Marker 2", 
    lat: -23.56, 
    lng: -46.64,
    image: "https://via.placeholder.com/300",
    description: "Descrição exemplo",
    author: "Usuário" 
  },
];

export default function Maps() {
  const [markers, setMarkers] = useState(initialMarkers);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const [user] = useState({ //temporário, precisa arrumar pra a partir da autenticação
    id: 1,
    name: "Cristiano"
  });

  const [center, setCenter] = useState({
    lat: -23.55,
    lng: -46.63,
  });

  const handleMapClick = (e) => {
    if (!e.latLng) return;

    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();

    setCenter({ lat: newLat, lng: newLng });
    setSelected(null);
  };

  function handleEdit(marker) {
  // navegar pra página de edição
    navigate(`/editar-planta/${marker.id}`);
  }
  function handleDelete(id) {
    setMarkers(prev => prev.filter(m => m.id !== id));
  }

  return (
    <div className="map-container">

      {/* MAPA */}
      <LoadScript googleMapsApiKey="KEY">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
          onClick={handleMapClick}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelected(marker)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* SIDEBAR */}
      <div className="sidebar">
        <Link to="/catalogo" className="back-btn">
          ← Catálogo
        </Link>

        {selected ? (
          <>
          <img src={selected.image} alt="planta" />
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>
          <p>Por: {selected.author}</p>

          <Link to={`/planta/${selected.id}`}>
            Ver mais
          </Link>

          {user && (
            <div className="actions">
              <button onClick={() => handleEdit(selected)}>
                Editar
              </button>

              <button onClick={() => handleDelete(selected.id)}>
                Excluir
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Selecione um marcador</p>
      )}

      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input type="text" placeholder="Buscar..." />
      </div>

      {/* BOTÃO + */}
      <Link to="/cadastrar-planta" className="add-btn">
        +
      </Link>

    </div>
  );
}
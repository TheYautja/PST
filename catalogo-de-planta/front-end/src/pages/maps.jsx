import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
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
  const [form, setForm] = useState({ name: "", lat: "", lng: "" });

  // ✅ NEW: center state
  const [center, setCenter] = useState({
    lat: -23.55,
    lng: -46.63,
  });

  const handleMapClick = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();

    // ✅ update map center
    setCenter({ lat: newLat, lng: newLng });

    // fill form with clicked coords
    setForm({
      name: "",
      lat: newLat,
      lng: newLng,
    });

    setSelected(null);
  };

  const handleSubmit = () => {

    if (selected) {
      // UPDATE
      setMarkers((prev) =>
        prev.map((m) =>
          m.id === selected.id
            ? {
                ...selected,
                name: form.name,
                lat: parseFloat(form.lat),
                lng: parseFloat(form.lng),
              }
            : m
        )
      );
    } else {
      // CREATE
      const newMarker = {
        id: Date.now(),
        name: form.name,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
        image: "https://via.placeholder.com/300",
        description: "Sem descrição",
        author: "Usuário"
      };
      setMarkers((prev) => [...prev, newMarker]);
    }

    setForm({ name: "", lat: "", lng: "" });
    setSelected(null);
  };

  // const handleEdit = (marker) => {
  //   setSelected(marker);
  //   setForm(marker);

  //   // optional: center map on marker when editing
  //   setCenter({ lat: marker.lat, lng: marker.lng });
  // };

  // const handleDelete = (id) => {
  //   setMarkers((prev) => prev.filter((m) => m.id !== id));
  // };

  return (
  <div className="map-container">

    {/* MAPA */}
    <LoadScript googleMapsApiKey="">
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
        </>
      ) : (
        <p>Selecione um marcador</p>
      )}
    </div>

    {/* SEARCH BOX */}
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
import React, { useState } from "react";
import "./PantallaSeleccion.css";

const PantallaSeleccion = ({ onSeleccion }) => {
  const [region, setRegion] = useState("Mundo");
  const [situacion, setSituacion] = useState("");

  const manejarCambioRegion = (e) => {
    setRegion(e.target.value);
    setSituacion(""); // Reiniciar situación al cambiar de región
  };

  const manejarSeleccion = () => {
    onSeleccion({ region, situacion });
  };

  return (
    <div className="pantalla-seleccion">
      <h2>Selecciona la región y situación</h2>
      <div>
        <label htmlFor="region">Región:</label>
        <select id="region" value={region} onChange={manejarCambioRegion}>
          <option value="Mundo">Mundo</option>
          <option value="España">España</option>
          <option value="Catalunya">Catalunya</option>
        </select>
      </div>

      {region !== "Mundo" && (
        <div>
          <label htmlFor="situacion">Situación:</label>
          <input
            id="situacion"
            type="text"
            placeholder="Introduce una ciudad o ubicación"
            value={situacion}
            onChange={(e) => setSituacion(e.target.value)}
          />
        </div>
      )}

      <button onClick={manejarSeleccion}>Consultar</button>
    </div>
  );
};

export default PantallaSeleccion;

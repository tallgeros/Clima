import React, { useState } from "react";

import TarjetaClima from "./components/TarjetaClima";
import BarraBusqueda from "./components/BarraBusqueda";
import "./App.css";

// const API_KEY = R3XZV2B6CAZHN5A3B7U5LUUH6;
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

function App() {
  const [datosHoy, setDatosHoy] = useState({});
  const [datosNoche, setDatosNoche] = useState({});
  const [pronosticoDiaSiguiente, setPronosticoDiaSiguiente] = useState([]);
  const [pronosticoHoras, setPronosticoHoras] = useState([]);
  const [avisos, setAvisos] = useState([]);
  const [errorClima, setErrorClima] = useState(null);

  const mostrarError = (mensaje) => {
    setErrorClima(mensaje);
    setTimeout(() => {
      setErrorClima(null);
    }, 2000); // Cierra el modal después de 2 segundos
  };

  const manejarBusqueda = async (ubicacion) => {
    try {
      const ubicacionCodificada = encodeURIComponent(ubicacion);
      const url = `${BASE_URL}/${ubicacionCodificada}?key=R3XZV2B6CAZHN5A3B7U5LUUH6&unitGroup=metric&include=days,hours,alerts&iconSet=icons2&contentType=json&lang=es`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      // Configurar datos para hoy con coordenadas
      const eventosHoy = data.days[0].alerts
        ? data.days[0].alerts.map((alerta) => alerta.event)
        : null;

      setDatosHoy({
        ubicacion: data.resolvedAddress,
        lat: data.latitude,
        lon: data.longitude,
        temperatura: data.days[0].temp,
        temperaturaMax: data.days[0].tempmax,
        temperaturaMin: data.days[0].tempmin,
        sensacionTermica: data.days[0].feelslike,
        condicion: data.days[0].conditions,
        humedad: data.days[0].humidity,
        viento: data.days[0].windspeed,
        icono: data.days[0].icon,
        presion: data.days[0].pressure,
        avisos: eventosHoy ? eventosHoy.join(", ") : "Sin avisos", 
        fecha: new Date(data.days[0].datetime).toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "2-digit", // Mostrar el mes como número
        }),
      });

      // Configurar datos de la noche
      setDatosNoche({
        ubicacion: data.resolvedAddress,
        faseLunar: data.days[0].moonphase,
        salidaLuna: data.days[0].moonrise,
        puestaLuna: data.days[0].moonset,
      });

      // Configurar pronóstico por horas
      setPronosticoHoras(
        data.days[0].hours.map((hora) => {
          return {
            hora: hora.datetime.split(":")[0], // Toma solo la hora en formato 'HH'
            temperatura: hora.temp || "--", // Valor por defecto
            condicion: hora.conditions || "Sin datos",
            icono: hora.icon || "default.png", // Icono por defecto
          };
        })
      );

      // Configurar pronóstico de 5 días
      const pronosticoCincoDias = data.days.slice(1, 6).map((dia) => ({
        fecha: `${new Date(dia.datetime).getDate()}/${
          new Date(dia.datetime).getMonth() + 1
        }`,
        temperaturaMax: dia.tempmax,
        temperaturaMin: dia.tempmin,
        condicion: dia.conditions,
        icono: dia.icon,
      }));
      setPronosticoDiaSiguiente(pronosticoCincoDias);

      // Configurar avisos meteorológicos
      if (data.alerts) {
        setAvisos(
          data.alerts.map((alerta) => ({
            titulo: alerta.headline,
            descripcion: alerta.description,
            severidad: alerta.severity,
            inicio: new Date(alerta.onset).toLocaleString("es-ES"),
            fin: new Date(alerta.ends).toLocaleString("es-ES"),
          }))
        );
      }
    } catch (error) {
        mostrarError("Error al obtener los datos del clima: " + error.message);
    }
  };

return (
  <div className="app">
    {errorClima && (
      <div className="modal">
        <div className="modal-content">
          <h2>Error</h2>
          <p>{errorClima}</p>
        </div>
      </div>
    )}
    <BarraBusqueda onSearch={manejarBusqueda} />
    <TarjetaClima
      onSearch={manejarBusqueda}
      datosHoy={datosHoy}
      datosNoche={datosNoche}
      pronosticoDiaSiguiente={pronosticoDiaSiguiente}
      pronosticoHoras={pronosticoHoras}
      avisos={avisos}
    />
  </div>
);

}

export default App;

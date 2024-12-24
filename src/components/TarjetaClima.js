import React from "react";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiHot,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import "./TarjetaClima1.css";

const TarjetaClima = ({
  datosHoy,
  datosNoche,
  pronosticoHoras = [],
  pronosticoDiaSiguiente = [],

}) => {
  const obtenerColorFondo = (condicion) => {
    switch (condicion) {
      case "Claro":
      case "Soleado":
        return "amarillo"; // Clase o color para clima soleado
      case "Parcialmente nublado":
      case "nublado":
      case "Lluvia, Parcialmente nublado":
        return "gris"; // Clase o color para clima nublado
      case "Rain":
      case "Thunderstorm":
        return "celeste-oscuro"; // Clase o color para lluvia
      case "Snow":
        return "blanco-apagado"; // Clase o color para nieve
      default:
        return "default"; // Clase para otras condiciones
    }
  };
console.log(datosHoy)
  const obtenerIcono = (condicion, tamaño = 100) => {
    const iconos = {
      Claro: "/assets/icons/clear-day.svg",
      Soleado: "assets/iconos/sunny.png",
      "Lluvia, Parcialmente nublado": "/assets/icons/party-cloudy-day.svg",
      "Lluvia, Parcialmente nublado": "/assets/icons/showers-night.svg",
      "Parcialmente nublado": "/assets/icons/cloudy.svg",
      "Parcialmente nublado": "/assets/icons/partly-cloudy-night.svg",
      Nublado: "/assets/icons/cloudy.svg",
      Lluvia: "/assets/icons/rain.png",
      Nieve: "/assets/icons/snow.svg",
      Tormenta: "/assets/icons/thunderstorm.svg",
      Cubierto: "/assets/icons/overcast.svg",
      "Nieve, Lluvia, Nublado": "/assets/icons/snow-showers-day.svg",
      "Lluvia, Nublado": "/assets/icons/snow.svg",
      "Lluvia, Nublado": "/assets/icons/showers-night.svg"
    };

    const iconoSeleccionado = iconos[condicion] || iconos["Despejado"]; // Usa "Despejado" como valor por defecto

    return (
      <img src={iconoSeleccionado} style={{ width: tamaño, height: tamaño }} />
    );
  };
  const iconoFaseLunar = (faseLunar, tamaño = 100) => {
    const phaseNumber = parseFloat(faseLunar);


    let src = "";
    if (phaseNumber >= 0 && phaseNumber < 0.125) {
      src = "/assets/luna/lunanueva.png"; // Luna nueva etapa 1
    } else if (phaseNumber >= 0.125 && phaseNumber < 0.25) {
      src = "/assets/luna/creciente.png"; // Luna nueva etapa 2
    } else if (phaseNumber >= 0.25 && phaseNumber < 0.375) {
      src = "/assets/luna/cuarto-crecuebte.png"; // Creciente etapa 3
    } else if (phaseNumber >= 0.375 && phaseNumber < 0.5) {
      src = "/assets/luna/bigosa-creciente.png"; // Creciente etapa 4
    } else if (phaseNumber >= 0.5 && phaseNumber < 0.625) {
      src = "/assets/luna/lunallena.png"; // Luna llena etapa 5
    } else if (phaseNumber >= 0.625 && phaseNumber < 0.75) {
      src = "/assets/luna/gibosa-menguante.png"; // Gibosa menguante etapa 6
    } else if (phaseNumber >= 0.75 && phaseNumber < 0.875) {
      src = "/assets/luna/cuarto-menguante.png"; // Cuarto menguante etapa 7
    } else if (phaseNumber >= 0.875 && phaseNumber <= 1.0) {
      src = "/assets/luna/creciente-menguante.png"; // Menguante etapa 8
    } else {
      return null;
    }

    return (
      <img
        src={src}
        alt="Fase lunar"
        style={{ width: tamaño, height: tamaño }}
      />
    );
  };

  const obtenerNombreFaseLunar = (fase) => {
    if (fase === 0) return "Luna nueva";
    if (fase > 0 && fase < 0.25) return "Creciente iluminante";
    if (fase === 0.25) return "Cuarto creciente";
    if (fase > 0.25 && fase < 0.5) return "Gibosa creciente";
    if (fase === 0.5) return "Luna llena";
    if (fase > 0.5 && fase < 0.75) return "Gibosa menguante";
    if (fase === 0.75) return "Cuarto menguante";
    if (fase > 0.75 && fase < 1) return "Creciente menguante";
    return "Fase desconocida";
  };


  return (
    <div className="tarjeta">
      {!datosHoy?.ubicacion ? (
        <div className="placeholder-inicial">
          <img
            src="/assets/portada.jpg"
            alt="Placeholder inicial"
            className="imagen-inicial"
          />
          <p>.</p>
        </div>
      ) : (
        <div className="tarjetaFrontal">
          <div className={`principal ${obtenerColorFondo(datosHoy.condicion)}`}>
            <div className="informacion-dia">
              <p className="ubicacion">{datosHoy.ubicacion}</p>
              <h3 className="fecha">{datosHoy.fecha}</h3>
            </div>

            <div className="icono-datos">
              <div className="icono">{obtenerIcono(datosHoy.condicion)}</div>
              <div className="datos">
                <p className="condiciones">{datosHoy.condicion}</p>
                <p> {datosHoy.temperatura}°C</p>
              </div>
            </div>
            
            <div className="datos-condiciones">
              <div className="condicion-item">
                <WiThermometer size={35} color="red" />
                <div className="condicion-info">
                  <p>Maximna</p>
                  <p>{datosHoy.temperaturaMax}°C</p>
                </div>
              </div>
              <div className="condicion-item">
                <WiThermometer size={35} color="blue" />
                <div className="condicion-info">
                  <p>Minima</p>
                  <p>{datosHoy.temperaturaMin}°C</p>
                </div>
              </div>
              <div className="condicion-item">
                <WiHot size={35} color="#FF7043" />
                <div className="condicion-info">
                  <p>Sensacion </p>
                  <p>{datosHoy.sensacionTermica}°C</p>
                </div>
              </div>
              <div className="condicion-item">
                <WiStrongWind size={35} color="#4FC3F7" />
                <div className="condicion-info">
                  <p>Viento</p>
                  <p>{datosHoy.viento}Km/h</p>
                </div>
              </div>
              <div className="condicion-item">
                <WiHumidity size={35} color="blue" />
                <div className="condicion-info">
                  <p>Humedad</p>
                  <p>{datosHoy.humedad}%</p>
                </div>
              </div>
            
              <div className="condicion-item">
                <WiBarometer size={35} color="#81C784" />
                <div className="condicion-info">
                  <p>Presion</p>
                  <p>{datosHoy.viento}mbar</p>
                </div>
              </div>
            </div>
            </div>
          {datosHoy.avisos !== "Sin avisos" && (
  <div className="aviso">
    <h3>Evento del día: {datosHoy.avisos}</h3>
  </div>
)}
          {/* Pronóstico por horas */}
          <h3 className="titulillo">Previson 24 horas</h3>
          <div className="pronostico-horas">
            {pronosticoHoras.map((hora, index) => (
              <div key={index} className="hora-pronostico">
                <p>Hora</p>
                <p>{hora.hora}</p>
                {obtenerIcono(hora.condicion, 35)}
                <p>{hora.temperatura}°C</p>
              </div>
            ))}
          </div>

          {/* Pronóstico de próximos días */}
          <div className="pronostico-dias">
            <h3 className="titulillo">Pronóstico a 5 Días</h3>
            <div className="lista-dias">
              {pronosticoDiaSiguiente.map((dia, index) => (
                <div key={index} className="dia">
                  <p>{dia.fecha}</p>
                  <p>Máx: {dia.temperaturaMax}°C</p>
                  <p>{obtenerIcono(dia.condicion, 40)}</p>
                  <p>Mín: {dia.temperaturaMin}°C</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cara Posterior - Noche y Pronóstico Día Siguiente */}
          <div className="datos-noche">
            <div className="noche-info">
              <div className="noche-item">
                <p>
                  Fase Lunar: {obtenerNombreFaseLunar(datosNoche.faseLunar)}
                </p>
                {iconoFaseLunar(datosNoche.faseLunar, 100, "#fff")}
              </div>
              <div className="solete">
                <div className="salida-puesta">
                  <WiSunrise size={50} color="#fff" />
                  <div className="salida">
                    <h3>Salida del Sol:</h3>
                    <p>{datosNoche.salidaSol || "Sin datos"}</p>
                  </div>
                </div>
                <div className="salida-puesta">
                  <WiSunset size={50} color="#fff" />
                  <div className="puesta">
                    <h3>Puesta del Sol:</h3>
                    <p>{datosNoche.puestaSol || "Sin datos"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default TarjetaClima;

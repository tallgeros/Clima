import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapaClima = ({ lat, lon, condiciones, precipitacion }) => {
    useEffect(() => {
        if (lat !== undefined && lon !== undefined) { // Verifica que las coordenadas no sean undefined
            const map = L.map('map').setView([lat, lon], 7);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Agregar marcador
            const marcador = L.marker([lat, lon]).addTo(map);
            marcador.bindPopup(`
              <b>Condiciones:</b> ${condiciones}<br>
              <b>Precipitación:</b> ${precipitacion ? `${precipitacion} mm` : 'Sin datos'}
            `);

            return () => {
                map.remove(); // Elimina el mapa cuando se desmonte el componente
            };
        } else {
            console.error('Coordenadas no válidas:', lat, lon);
        }
    }, [lat, lon, condiciones, precipitacion]);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapaClima;






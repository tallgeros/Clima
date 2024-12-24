import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './BarraBusqueda.css';

const BarraBusqueda = ({ onSearch }) => {
    const [ubicacion, setUbicacion] = useState('');
    const inputRef = useRef(null);

    const manejarBusqueda = () => {
        onSearch(ubicacion);
        setUbicacion(''); // Limpiar el campo de búsqueda
    };

    const manejarCambio = (e) => {
        const valor = e.target.value;
        if (valor.length === 1) {
            // Capitalizar la primera letra si es la primera entrada
            setUbicacion(valor.charAt(0).toUpperCase() + valor.slice(1));
        } else {
            setUbicacion(valor);
        }
    };

    useEffect(() => {
        // Enfocar el campo de entrada al montar el componente
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="busqueda">
            <div className="input-wrapper">
                <input
                    type="text"
                    ref={inputRef} 
                    value={ubicacion}
                    onChange={manejarCambio}
                    placeholder="Buscar ubicación..."
                />
                <button onClick={manejarBusqueda}>
                    <FaSearch />
                </button>
            </div>
        </div>
    );
};

export default BarraBusqueda;


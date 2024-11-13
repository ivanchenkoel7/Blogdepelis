import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

export const Buscador = ({ listadoState, setListadoState, setIsBuscadorActive }) => {
    const [busqueda, setBusqueda] = useState('');
    const [noEncontrado, setNoEncontrado] = useState(false);
    const resultadosRef = useRef(null); // Crear un ref para la sección de resultados

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const buscarPelicula = useCallback(debounce(async (term) => {
        console.log('buscarPelicula se está ejecutando');
        console.log('Término de búsqueda:', term);

        let peliculas_encontradas = [];

        if (listadoState && listadoState.length > 0) {
            peliculas_encontradas = listadoState.filter(pelicula => {
                return pelicula.titulo.toLowerCase().includes(term.toLowerCase());
            });
        }

        console.log('Peliculas encontradas en listadoState:', peliculas_encontradas);

        if (term.length <= 1 || peliculas_encontradas.length === 0) {
            try {
                const response = await axios.get(`https://blogpelis-back.onrender.com/api/peliculas/?search=${term}`);
                console.log('Respuesta de la API:', response.data); // Imprimir la respuesta completa
                peliculas_encontradas = response.data || []; // La respuesta es una lista de objetos Pelicula
                console.log('Peliculas encontradas en la API:', peliculas_encontradas);
                if (peliculas_encontradas.length === 0) {
                    setNoEncontrado(true);
                    setIsBuscadorActive(false); // Desactivar el estado del buscador si no hay resultados
                } else {
                    setNoEncontrado(false);
                    setIsBuscadorActive(true); // Activar el estado del buscador si hay resultados
                }
            } catch (error) {
                console.error('Error al obtener las películas de la API:', error);
                setNoEncontrado(true);
                setIsBuscadorActive(false);
            }
        } else {
            setNoEncontrado(false);
            setIsBuscadorActive(true); // Activar el estado del buscador si hay resultados
        }

        console.log('Peliculas encontradas final:', peliculas_encontradas);
        setListadoState(peliculas_encontradas);

        // Desplazar la vista a la sección de resultados
        if (resultadosRef.current) {
            resultadosRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300), [listadoState, setListadoState, setIsBuscadorActive]);

    const handleInputChange = (e) => {
        const term = e.target.value;
        setBusqueda(term);
        buscarPelicula(term);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    };

    return (
        <div className="search">
            {(noEncontrado && busqueda.length > 2) && (
                <span className='no_encontrado'>No se encontraron coincidencias</span>
            )}
            <form action="" className="form__aside-search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="busqueda"
                    id="search"
                    placeholder="Buscador..."
                    value={busqueda}
                    onChange={handleInputChange}
                />
            </form>
            <div ref={resultadosRef}>
                {/* Aquí va la sección donde se muestran las películas */}
            </div>
        </div>
    );
};
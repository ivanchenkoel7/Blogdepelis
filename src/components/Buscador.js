import React, { useState } from 'react';

export const Buscador = ({ listadoState, setListadoState, setIsBuscadorActive }) => {
    
    const [busqueda, setBusqueda] = useState('');
    const [noEncontrado, setnoEncontrado] = useState(false);
    
    const buscarPelicula = (e) => {
        const term = e.target.value;
        setBusqueda(term);

        let peliculas_encontradas = listadoState.filter(pelicula => {
            return pelicula.titulo.toLowerCase().includes(term.toLowerCase());
        });

        if (term.length <= 1 || peliculas_encontradas.length === 0) {
            peliculas_encontradas = JSON.parse(localStorage.getItem('peliculas'));
            setnoEncontrado(true);
            setIsBuscadorActive(false); // Desactivar el estado del buscador si no hay resultados
        } else {
            setnoEncontrado(false);
            setIsBuscadorActive(true); // Activar el estado del buscador si hay resultados
        }

        setListadoState(peliculas_encontradas);
    }
    
    return (
        <div className="search">
            {(noEncontrado && busqueda.length > 2) && (
                <span className='no_encontrado'>No se encontraron coincidencias</span>
            )}
            <form action="" className="form__aside-search">
                <input
                    type="text"
                    name="busqueda"
                    id="search"
                    placeholder="Buscador..."
                    value={busqueda}
                    onChange={buscarPelicula}
                />
            </form>
        </div>
    );
}
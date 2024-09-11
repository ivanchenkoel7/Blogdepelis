import React, { useState } from 'react';

export const Buscador = ({ listadoState, setListadoState }) => {
    
    const [busqueda, setBusqueda] = useState('');
    const [noEncontrado, setnoEncontrado] = useState(false);
    
    const buscarPelicula = (e) => {
        setBusqueda(e.target.value);

        let peliculas_encontradas = listadoState.filter(pelicula => {
            return pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase());
        });

        if (busqueda.length <= 1 || peliculas_encontradas.length === 0) {
            peliculas_encontradas = JSON.parse(localStorage.getItem('peliculas'));
            setnoEncontrado(true);
        } else {
            setnoEncontrado(false);
        }

        setListadoState(peliculas_encontradas);
    }
    
    return (
        <div className="search">
            <h3 className="title__aside">Buscador de Peliculas</h3>
            {(noEncontrado && busqueda.length > 2) && (
                <span className='no_encontrado'>No se encontraron coincidencias</span>
            )}

            <form action="" className="form__aside">
                <input
                    type="text"
                    name="busqueda"
                    id="search"
                    placeholder="Buscar..."
                    autoComplete='off'
                    value={busqueda}
                    onChange={buscarPelicula}
                />
                <input type="submit" value="Buscar" />
            </form>
        </div>
    );
}

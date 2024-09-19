import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Editar } from './Editar';
import { toast } from 'react-toastify';

export const Listado = ({ listadoState, setListadoState }) => {
    const [editar, setEditar] = useState(0);

    const conseguirPeliculas = () => {
        axios.get('http://192.168.1.24:8000/api/peliculas/')
            .then(response => {
                setListadoState(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las películas:', error);
                toast.error('Hubo un error al obtener las películas.');
            });
    };

    useEffect(() => {
        conseguirPeliculas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListadoState]);

    const borrarPelicula = (id) => {
        axios.delete(`http://192.168.1.24:8000/api/peliculas/${id}/`)
            .then(() => {
                setListadoState(prevState => prevState.filter(pelicula => pelicula.id !== id));
                toast.success('Pelicula eliminada exitosamente');
            })
            .catch(error => {
                console.error('Hubo un error al eliminar la película:', error);
                toast.error('Hubo un error al eliminar la película. Por favor, intenta nuevamente.');
            });
    };

    return (
        <>
            {listadoState && listadoState.length > 0 ? 
                listadoState.map(pelicula => {
                    return (
                        <article key={pelicula.id} className="movie__item">
                            <div className="item__image">
                                <img
                                    src={pelicula.image}
                                    className="img__movie"
                                    alt="Imagen de la pelicula"
                                />
                            </div>
                            <div className="item__description">
                                <div className="pre___movie">
                                    <h4 className="title__pre">Star Wars</h4>
                                    <hr className="pre__hr" />
                                </div>
                                <h3 className="title__ep">{pelicula.episodio}</h3>
                                <hr className="title__hr" />
                                <h2 className="title__movie">{pelicula.titulo}</h2>
                                <p className="description__movie">{pelicula.descripcion}</p>
                                <div className="item__button">
                                    <button className="edit" onClick={() => { setEditar(pelicula.id) }}>Editar</button>
                                    <button className="delete" onClick={() => borrarPelicula(pelicula.id)}>Eliminar</button>
                                </div>
                                <div className="edit__form">
                                    {editar === pelicula.id && (
                                        <Editar pelicula={pelicula}
                                            conseguirPeliculas={conseguirPeliculas}
                                            setEditar={setEditar}
                                            setListadoState={setListadoState} />
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })
                : <h2 className='title__movie'>No hay peliculas cargadas para mostrar</h2>}
        </>
    );
};
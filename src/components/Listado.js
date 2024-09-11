import React, { useEffect, useState} from 'react';
import { Editar } from './Editar';

export const Listado = ({listadoState,setListadoState}) => {
    //const [listadoState, setListadoState] = useState([]);

    const [editar, setEditar] = useState(0);




    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
        setListadoState(peliculas);

        return peliculas;
    };

    useEffect(() => {
        conseguirPeliculas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setListadoState]);


    const borrarPelicula = (id) => {
        let peliculas_almacenadas = conseguirPeliculas();

        let nuevo_listado = peliculas_almacenadas.filter(pelicula => pelicula.id !== parseInt (id));

        setListadoState(nuevo_listado);

        localStorage.setItem('peliculas', JSON.stringify(nuevo_listado));

    }

    return (
        <>
            {listadoState.length > 0 ? 
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
                                    <button className="edit" onClick={ () => {setEditar(pelicula.id)}}>Editar</button>
                                    <button className="delete" onClick={ () => borrarPelicula(pelicula.id)}>Eliminar</button>
                                </div>
                                <div className="edit__form">
                                    {/*formulario editar*/}
                                    {editar === pelicula.id && (
                                        <Editar pelicula={pelicula}
                                                conseguirPeliculas={conseguirPeliculas}
                                                setEditar={setEditar}
                                                setListadoState={setListadoState}/>
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
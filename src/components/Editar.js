import React, { useState } from 'react';

export const Editar = ({ pelicula, conseguirPeliculas, setEditar, setListadoState }) => {
    const titulocomped = "Editar Peliculas";
    const [imageState, setImageState] = useState(null);

    const handleFileClick = () => {
        document.getElementById('image').click();
    };

    const handleFileChange = (e) => {
        setImageState(e.target.files[0]);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const guardarEdicion = async (e, id) => {
        e.preventDefault();

        let target = e.target;

        const peliculas_almacenadas = conseguirPeliculas();
        const indice = peliculas_almacenadas.findIndex(pelicula => pelicula.id === id);

        let imageBase64 = pelicula.image;
        if (imageState) {
            imageBase64 = await convertToBase64(imageState);
        }

        let pelicula_actualizada = {
            id: id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value,
            episodio: target.episodio.value,
            image: imageBase64
        };

        peliculas_almacenadas[indice] = pelicula_actualizada;

        localStorage.setItem('peliculas', JSON.stringify(peliculas_almacenadas));

        setListadoState(peliculas_almacenadas);
        setEditar(0);
    }

    return (
        <div className='edit_form'>
            <h3 className="title__aside">{titulocomped}</h3> 

            <form onSubmit={ e => guardarEdicion(e, pelicula.id)} className="form__aside">
                <input 
                    type="text"
                    name="titulo"
                    defaultValue={pelicula.titulo}
                    id="titulo"
                    placeholder="Editar Titulo..."
                />
                <textarea 
                    name="descripcion"
                    id="descripcion"
                    defaultValue={pelicula.descripcion}
                    placeholder="Editar Descripción..."
                />
                <input
                    type="text"
                    id="episodio"
                    name="episodio"
                    placeholder="Episodio"
                    defaultValue={pelicula.episodio}
                />
                <input 
                    type="file" 
                    id="image" 
                    name="image" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                />
                <button type="button" onClick={handleFileClick} className="custom-file-upload">Seleccionar Imagen</button>
                {imageState && <img src={URL.createObjectURL(imageState)} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                <button className="edit">Editar</button>
            </form>
        </div>
    )
}
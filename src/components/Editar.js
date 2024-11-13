import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Editar = ({ pelicula, conseguirPeliculas, setEditar }) => {
    const titulocomped = "Editar Peliculas";
    const [peliculaState, setPeliculaState] = useState({
        titulo: pelicula.titulo,
        descripcion: pelicula.descripcion,
        episodio: pelicula.episodio,
        image: null
    });
    const { titulo, descripcion, episodio, image } = peliculaState;

    const handleFileClick = () => {
        document.getElementById('image').click();
    };

    const handleFileChange = (e) => {
        setPeliculaState({
            ...peliculaState,
            image: e.target.files[0]
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'episodio' && value.length > 20) {
            toast.error('El campo Episodio no puede tener más de 20 caracteres.');
            return;
        }
        setPeliculaState({
            ...peliculaState,
            [name]: value
        });
    };

    const guardarEdicion = async (e, id) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('episodio', episodio);
        if (image) {
            formData.append('image', image);
        }

        axios.put(`https://blogpelis-back.onrender.com/api/peliculas/${id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            conseguirPeliculas();
            setEditar(0);
            toast.success('Pelicula actualizada exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al actualizar la película:', error);
            toast.error('Hubo un error al actualizar la película. Por favor, intenta nuevamente.');
        });
    };

    return (
        <div className='edit_form'>
            <h3 className="title__aside">{titulocomped}</h3> 

            <form onSubmit={e => guardarEdicion(e, pelicula.id)} className="form__aside">
                <input 
                    type="text"
                    name="titulo"
                    value={titulo}
                    id="titulo"
                    placeholder="Editar Titulo..."
                    onChange={handleInputChange}
                />
                <textarea 
                    name="descripcion"
                    id="descripcion"
                    value={descripcion}
                    placeholder="Editar Descripción..."
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    id="episodio"
                    name="episodio"
                    placeholder="Episodio"
                    value={episodio}
                    onChange={handleInputChange}
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
                {image && <img src={URL.createObjectURL(image)} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                <button type="submit" className="edit">Editar</button>
            </form>
        </div>
    );
};
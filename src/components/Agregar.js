import React, { useState } from 'react';
import { saveStorage } from '../helpers/saveStorage';

const Agregar = ({ setListadoState }) => {
    const titulocom = "Agregar Peliculas";
    const [peliculaState, setPeliculaState] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        image: null,
        episodio: ''
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
        setPeliculaState({
            ...peliculaState,
            [name]: value
        });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const movieDateForm = async (e) => {
        e.preventDefault();
        let target = e.target;
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;
        let image = peliculaState.image;
        let episodio = target.episodio.value;

        if (!titulo || !descripcion || !image || !episodio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        let imageBase64 = await convertToBase64(image);
        let pelicula = {
            id: new Date().getTime(),
            titulo: titulo,
            descripcion: descripcion,
            image: imageBase64,
            episodio: episodio
        };

        setListadoState(elementos => {
            return [...elementos, pelicula];
        });

        saveStorage('peliculas', pelicula);
        alert('Pelicula Agregada exitosamente');

        // Limpiar el formulario
        setPeliculaState({
            id: '',
            titulo: '',
            descripcion: '',
            image: null,
            episodio: ''
        });
    };

    return (
        <div className="agregar">
            <h3 className="title__aside">{titulocom}</h3>
            {(titulo && descripcion && episodio) && <div className="alert alert-success">Pelicula Agregada</div>}
            <form onSubmit={movieDateForm} className="form__aside">
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    placeholder="Agregar Titulo..."
                    value={titulo}
                    onChange={handleInputChange}
                />
                <textarea
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripcion"
                    value={descripcion}
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
                <input type="file" name="image" id="image" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                <button type="button" onClick={handleFileClick} className="custom-file-upload">Seleccionar Imagen</button>
                {image && <img src={URL.createObjectURL(image)} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                <input type="submit" id='save' value="Agregar" />
            </form>
        </div>
    );
};

export default Agregar;
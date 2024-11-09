import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Agregar = ({ setListadoState }) => {
    const titulocom = "Agregar Peliculas";
    const [peliculaState, setPeliculaState] = useState({
        titulo: '',
        descripcion: '',
        episodio: '',
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
        setPeliculaState({
            ...peliculaState,
            [name]: value
        });
    };

    const movieDateForm = async (e) => {
        e.preventDefault();
        if (!titulo || !descripcion || !episodio || !image) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('descripcion', descripcion);
        formData.append('episodio', episodio);
        formData.append('image', image);

        axios.post('http://127.0.0.1:8000/api/peliculas/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setListadoState(prevState => [...prevState, response.data]);
            toast.success('Pelicula Agregada exitosamente');
        })
        .catch(error => {
            console.error('Hubo un error al agregar la película:', error);
            toast.error('Hubo un error al agregar la película. Por favor, intenta nuevamente.');
        });

        // Limpiar el formulario
        setPeliculaState({
            titulo: '',
            descripcion: '',
            episodio: '',
            image: null
        });
    };

    return (
        <div className="agregar">
            <h3 className="title__aside">{titulocom}</h3>
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
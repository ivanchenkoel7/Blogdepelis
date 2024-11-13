import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PersonajeCard from './PersonajeCard';

const PersonajesList = () => {
    const initialFormData = {
        nombre: '',
        image: null,
        descripcion: '',
        color: 'rojos',
    };

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [personajes, setPersonajes] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Mostrar una vista previa de la imagen
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.descripcion || !formData.color || !formData.image) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

            try {
                const response = await axios.post('https://blogpelis-back.onrender.com/api/personajes/', {
                    nombre: formData.nombre,
                    descripcion: formData.descripcion,
                    color: formData.color,
                    image_base64: base64String,
                });
                if (response.status === 201) {
                    toast.success('Personaje creado exitosamente');
                    setShowForm(false);
                    setFormData(initialFormData); // Limpiar el formulario
                    setImagePreview(null); // Limpiar la vista previa de la imagen
                    fetchPersonajes(); // Actualizar la lista de personajes
                } else {
                    toast.error('Error al crear el personaje');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Hubo un error al crear el personaje. Por favor, intenta nuevamente.');
            }
        };
        reader.readAsDataURL(formData.image);
    };

    const fetchPersonajes = async () => {
        try {
            const response = await axios.get('https://blogpelis-back.onrender.com/api/personajes/');
            setPersonajes(response.data);
        } catch (error) {
            console.error('Error fetching personajes:', error);
            toast.error('Hubo un error al obtener los personajes.');
        }
    };

    useEffect(() => {
        // Llamar a fetchPersonajes inmediatamente
        fetchPersonajes();

        // Configurar el polling para llamar a fetchPersonajes cada 5 segundos
        const intervalId = setInterval(fetchPersonajes, 5000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="personajes" id='personajes'>
            <h2 className="header__title">Personajes</h2>
            <button className='button__personaje' onClick={() => setShowForm(!showForm)}>Agregar Personaje</button>

            {showForm && (
                <div className="card-one form__card">
                    <form className='form__car-one' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />

                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <button type="button" onClick={() => document.getElementById('image').click()}>
                            Subir Imagen
                        </button>
                        {imagePreview && <img src={imagePreview} alt="Vista previa" style={{ width: '100px', height: '100px' }} />}

                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />

                        <select className='select__form' name="color" value={formData.color} onChange={handleInputChange}>
                            <option value="rojos">Sith</option>
                            <option value="azules">Jedi Azul</option>
                            <option value="verdes">Jedi Verde</option>
                            <option value="star">The Force</option>
                        </select>

                        <button type="submit" className='button__card'>Guardar</button>
                    </form>
                </div>
            )}

            <div className="personajes__container">
                {personajes.length > 0 ? (
                    personajes.map((personaje) => (
                        <PersonajeCard key={personaje.id} personaje={personaje} />
                    ))
                ) : (
                    <h2 className="title__movie">No hay personajes cargados para mostrar</h2>
                )}
            </div>
        </section>
    );
};

export default PersonajesList;
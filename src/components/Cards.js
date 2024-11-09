import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Cards = () => {
    const initialFormData = {
        frase: '',
        icono: 'fa-solid fa-jedi',
        personaje_id: ''
    };

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [cards, setCards] = useState([]);
    const [personajes, setPersonajes] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            frase: formData.frase,
            icono: formData.icono,
            personaje_id: Number(formData.personaje_id) // Asegúrate de que el ID sea un número
        };
        console.log('Datos enviados:', dataToSend); // Agregar esta línea para depuración
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cards/', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                toast.success('Tarjeta creada exitosamente');
                setShowForm(false);
                setFormData(initialFormData); // Limpiar el formulario
                fetchCards(); // Actualizar la lista de tarjetas
            } else {
                toast.error('Error al crear la tarjeta');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data) {
                console.error('Detalles del error:', error.response.data);
            }
            toast.error('Hubo un error al crear la tarjeta. Por favor, intenta nuevamente.');
        }
    };

    const fetchCards = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cards/');
            setCards(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
            toast.error('Hubo un error al obtener las tarjetas.');
        }
    };

    const fetchPersonajes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/personajes/');
            setPersonajes(response.data);
        } catch (error) {
            console.error('Error fetching personajes:', error);
            toast.error('Hubo un error al obtener los personajes.');
        }
    };

    useEffect(() => {
        fetchCards();
        fetchPersonajes();
    }, []);

    return (
        <section className="blog__section" id='frases'>
            <div className="blog__container">
                <div className="card-principal">
                    <h3 className="card__saludo">Bienvenidos a StarBlog</h3>
                    <div className="iconos__star">
                        <i className="fa-solid fa-jedi"></i>
                        <i className="fa-brands fa-old-republic"></i>
                        <i className="fa-brands fa-galactic-republic"></i>
                        <i className="fa-brands fa-galactic-senate"></i>
                    </div>
                    <p className="card__text">
                        Aqui encontrarás información sobre las películas de Star
                        Wars, addemas de grandes frases celebres.
                    </p>
                    <a href="#movies" className="card__movies">Películas</a>
                    <button className='button__card' onClick={() => setShowForm(!showForm)}>Agregar Frase</button>
                </div>

                {showForm && (
                    <div className="card-one form__card">
                        <form className='form__car-one' onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="frase"
                                placeholder="Frase"
                                value={formData.frase}
                                onChange={handleInputChange}
                            />

                            <select className='select__form' name="icono" value={formData.icono} onChange={handleInputChange}>
                                <option value="fa-solid fa-jedi">Jedi</option>
                                <option value="fa-brands fa-old-republic">Old Republic</option>
                                <option value="fa-brands fa-galactic-republic">Galactic Republic</option>
                                <option value="fa-brands fa-galactic-senate">Galactic Senate</option>
                            </select>

                            <select className='select__form' name="personaje_id" value={formData.personaje_id} onChange={handleInputChange}>
                                <option value="">Selecciona un personaje</option>
                                {personajes.map((personaje) => (
                                    <option key={personaje.id} value={personaje.id}>
                                        {personaje.nombre}
                                    </option>
                                ))}
                            </select>

                            <button type="submit" className='button__card'>Guardar</button>
                        </form>
                    </div>
                )}

                <CardList cards={cards} />
            </div>
        </section>
    );
};

export default Cards;
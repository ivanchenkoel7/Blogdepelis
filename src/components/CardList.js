import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CardList = () => {
    const [cards, setCards] = useState([]);

    // Función para obtener las tarjetas desde la API
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cards/');
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
                toast.error('Hubo un error al obtener las tarjetas.');
            }
        };

        fetchCards(); // Obtener las tarjetas al cargar el componente
        const intervalId = setInterval(fetchCards, 5000); // Actualizar cada 5 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <div className="cards__frases">
            {cards.length > 0 ? (
                cards.map((card) => (
                    <div key={card.id} className={`card ${card.personaje.color}-border`}>
                        <h3 className={`card__frase ${card.personaje.color}-text`}>{card.frase}</h3>
                        <i className={card.icono}></i>
                        <strong className={`card__nombre ${card.personaje.color}-text`}>{card.personaje.nombre}</strong>
                    </div>
                ))
            ) : (
                <h2 className="title__movie">No hay tarjetas cargadas para mostrar</h2>
            )}
        </div>
    );
};

export default CardList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CardList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://192.168.1.24:8000/api/cards/');
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
                toast.error('Hubo un error al obtener las tarjetas.');
            }
        };

        // Llamar a fetchCards inmediatamente
        fetchCards();

        // Configurar el polling para llamar a fetchCards cada 5 segundos
        const intervalId = setInterval(fetchCards, 5000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="cards__frases">
            {cards.length > 0 ? (
                cards.map((card) => (
                    <div key={card.id} className={`card ${card.color}-border`}>
                        <h3 className="card__frase">{card.frase}</h3>
                        <i className={card.icono}></i>
                        <strong className={`card__nombre ${card.color}`}>
                            {card.nombre}
                        </strong>
                    </div>
                ))
            ) : (
                <h2 className="title__movie">No hay tarjetas cargadas para mostrar</h2>
            )}
        </div>
    );
};

export default CardList;
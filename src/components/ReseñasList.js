import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormularioReseña from './FormularioReseña';

const ReseñasList = () => {
    const [showForm, setShowForm] = useState(false);
    const [reseñas, setReseñas] = useState([]);

    const fetchReseñas = async () => {
        try {
            const response = await axios.get(`https://ivanchenkoel7.dev/api/reseñas/`);
            setReseñas(response.data);
        } catch (error) {
            console.error('Error fetching reseñas:', error);
            toast.error('Hubo un error al obtener las reseñas.');
        }
    };

    useEffect(() => {
        fetchReseñas();
        const intervalId = setInterval(fetchReseñas, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const getBadgeClass = (badge) => {
        switch (badge) {
            case 'Jedi Verde':
                return 'jedi-verde';
            case 'Jedi Azul':
                return 'jedi-azul';
            case 'Sith':
                return 'sith';
            case 'The Force':
                return 'the-force';
            default:
                return '';
        }
    };

    return (
        <section className="blog__saludos" id='reseñas'>
            <div className="saludos__container">
                <div className="container__welcome">
                    <h3 className="saludo__title">StarBlog Reseñas</h3>
                    <p className="saludo__text">
                        Deja tu saludo u opinion, cada interaccion es valida y apreciada, 
                        Gracias y ¡Que la Fuerza te acompañe!
                    </p>
                    <button 
                        className="saludo__button"
                        onClick={() => setShowForm(!showForm)}
                    >
                        Deja tu reseña
                    </button>
                </div>

                <FormularioReseña 
                    showForm={showForm}
                    onSuccess={() => {
                        setShowForm(false);
                        fetchReseñas();
                    }}
                />

                <div className='container__box-cards'>
                {reseñas.map((reseña) => (
                        <div key={reseña.id} className="container__cards-saludo">
                        <div className="card__profile">
                            <div className="content__card">
                                <div className={`back ${getBadgeClass(reseña.badge_display)}`}>
                                    <div className="back-content">
                                        <img 
                                            src={`data:image/webp;base64,${reseña.image_base64}`} 
                                            alt="" 
                                            className={`img__profile ${getBadgeClass(reseña.badge_display)}`}
                                        />
                                        <strong className={`name__saludo ${getBadgeClass(reseña.badge_display)}`}>
                                            {reseña.name}
                                        </strong>
                                        <h3 className="name__job">{reseña.job}</h3>
                                    </div>
                                </div>
                                <div className="front">
                                    <div className="img">
                                        <div className="circle"></div>
                                        <div className="circle" id="right"></div>
                                        <div className="circle" id="bottom"></div>
                                        <div className="circle" id="left"></div>
                                    </div>

                                    <div className="front-content">
                                        <small className={`badge ${getBadgeClass(reseña.badge_display)}`}>
                                            {reseña.badge_display}
                                        </small>
                                        <div className={`description ${getBadgeClass(reseña.badge_display)}`}>
                                            <div className="title">
                                                <p className={`title__front ${getBadgeClass(reseña.badge_display)}`}>
                                                    {reseña.title}
                                                </p>
                                            </div>
                                            <p className="card-footer">
                                                {reseña.review}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default ReseñasList;
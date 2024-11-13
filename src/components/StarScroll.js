import React, { useEffect } from 'react';

export const StarScroll = () => {
    useEffect(() => {
        const stars = 400;
        const starBackground = document.querySelector('.star-background');

        for (let i = 0; i < stars; i++) {
            let star = document.createElement("div");
            star.className = 'stars';
            if (Math.random() < 0.1) { // 10% de las estrellas serán fugaces
                star.classList.add('shooting-star');
                star.style.animationDelay = `${Math.random() * 5}s`; // Retraso aleatorio para la animación
            }
            var xy = randomPosition(starBackground);
            star.style.top = xy[0] + 'px';
            star.style.left = xy[1] + 'px';
            starBackground.append(star);
        }

        function randomPosition(container) {
            var containerWidth = container.clientWidth;
            var containerHeight = container.clientHeight;
            var randomX = Math.floor(Math.random() * containerHeight);
            var randomY = Math.floor(Math.random() * containerWidth);
            return [randomX, randomY];
        }

        // eslint-disable-next-line no-unused-vars
        const content = document.querySelector('#content');
        const logo = document.querySelector('.logo');

        // Añadir la clase logo-final después de 45 segundos
        setTimeout(() => {
            logo.classList.add('logo-final');
        }, 45000); // 45 segundos

        setTimeout(() => {
            const nav = document.querySelector('.nav__react');
            nav.classList.add('show');
        }, 47000); // 47 segundos
    }, []);

    return (
        <div>
            <div className="intro">
                Hace mucho tiempo, en una galaxia muy,<br /> muy lejana....
            </div>
            <div className="logo">
                <div className="pre___movie">
                    <h4 className="pre__header">Star Wars</h4>
                    <hr className="hr__header" id="linea" />
                </div>
                <h1 className="header__title">Blog de Películas</h1>
            </div>
            <div id="scroller">
                <div id="content">
                    <p id="title">Episode XXIX</p>
                    <p id="subtitle">Ivanchenko desarrolla StarBlog</p>
                    <br />
                    <p>Todo comenzó como un simple proyecto de React en el curso de Víctor Robles Web.</p>
                    <p>La premisa consistía en crear un sitio web que almacenara películas y guardarlas en el local storage.</p>
                    <p>Continué puliendo el estilo y siempre pensando que si hacía algo más, podría ir aprendiendo en el camino.</p>
                    <p>Fue así que me incliné en hacer una página interactiva en la cual se viera el trabajo pero además algo que a mí me gusta mucho como lo es Star Wars.</p>
                    <p>Luego de un arduo trabajo y muchas horas de pulido llegué a esto que es de mi agrado, sabiendo que le falta y siempre se puede mejorar.</p>
                </div>
            </div>
            <div className="star-background"></div>
        </div>
    );
};
import React, { useEffect } from 'react';

export const StarScroll = () => {
    useEffect(() => {
        const stars = 450;
        const starBackground = document.querySelector('.star-background');

        for (let i = 0; i < stars; i++) {
            let star = document.createElement("div");
            star.className = 'stars';
            if (Math.random() < 0.05) { // 10% de las estrellas serán fugaces
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
                <h1 className="header__title">Star Blogs</h1>
            </div>
            <div id="scroller">
                <div id="content">
                    <p id="title">Episode XXIX</p>
                    <p id="subtitle">Bienvenidos a StarBlog</p>
                    <br />
                    <p>El proyecto continua, de a poco se van añadiendo nuevas cosas.</p>
                    <p>La idea es crear una pequeña comunidad, para alimentar el sitio y que este se haga visible</p>
                    <p>En el camino se encontraron falta de ganas y poco acompañamiento pero hay que seguirle dando</p>
                    <p>Seguire con este proyecto, me gusta y siempre sera un lindo lugar en donde añadir nuevos conocimientos.</p>
                    <p>Gracias por pasarte</p>
                    <p>!May the force be with you, always!</p>
                </div>
            </div>
            <div className="star-background"></div>
        </div>
    );
};
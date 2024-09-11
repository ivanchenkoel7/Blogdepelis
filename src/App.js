// src/App.js
import './App.css';
import './responsive.css';

import iv7logo from './images/iv7logo.webp';
import lightsaber from './images/lightsaber.ico';
import xwing from './images/xwing.png';
import NavWithSound from './components/NavWithSound';
import { Buscador } from './components/Buscador';
import Agregar from './components/Agregar';
import { Listado } from './components/Listado';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import { useState } from 'react';

function App() {
  const [listadoState, setListadoState] = useState([]);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className={`layout ${isSidebarActive ? 'sidebar-active' : ''}`}>
      <nav className="nav__react">
        <div className="logo__nav">
          <img className="nav__logo" src={iv7logo} alt="logo_nav" />
        </div>

        <ul className="nav__list">
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Inicio" />
            <a className="nav__link" href="#/">Inicio</a>
          </li>
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Peliculas" />
            <a className="nav__link" href="#/">Peliculas</a>
          </li>
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Blog" />
            <a className="nav__link" href="#/">Blog</a>
          </li>
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Contacto" />
            <a className="nav__link" href="#/">Contacto</a>
          </li>
        </ul>
        <audio id="hover-sound" src="/sounds/Lightsaber.mp3" preload="auto"></audio>
      </nav>

      <NavWithSound />

      <header className="header__react">
        <div className="pre___movie">
          <h4 className="pre__header">Star Wars</h4>
          <img className="header__icon" src={lightsaber} alt="Icono Inicio" />
          <hr className="hr__header" id="linea" />
        </div>
        <h1 className="header__title">Blog de Peliculas</h1>
        <div className="bolaNavidad"></div>
        <div className="xwing">
          <img src={xwing} className="img__x" alt="xwing" />
        </div>
        <div className="falcon"></div>
        <div className="caza-tie"></div>
        <audio id="hover-sound2" src="/sounds/intro.mp3" preload="auto"></audio>
      </header>

      <main className="main__react">
        <section className="main__content">
          <Listado listadoState={listadoState} setListadoState={setListadoState} />
        </section>
        <ToggleSidebarButton toggleSidebar={toggleSidebar} />
    
        <aside className={`main__sidebar ${isSidebarActive ? 'active' : ''}`}>
          <div className="forms__sec">
            <Buscador listadoState={listadoState} setListadoState={setListadoState} />
            <Agregar setListadoState={setListadoState} />
          </div>
        </aside>
      </main>

      <footer className="footer__react">
        <div className="icons__footer">
          <i className="fa-solid fa-jedi"></i>
          <i className="fa-brands fa-old-republic"></i>
          <h2 className="footer__text">Desarrollado por: Ivanchenkoel7</h2>
          <i className="fa-brands fa-galactic-republic"></i>
          <i className="fa-brands fa-galactic-senate"></i>
        </div>
      </footer>
    </div>
  );
}

export default App;
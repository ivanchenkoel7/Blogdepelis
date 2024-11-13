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
import { useState, useEffect } from 'react';
import { Cards } from './components/Cards';
import { StarScroll } from './components/StarScroll';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonajesList from './components/PersonajesList';

function App() {
  const [listadoState, setListadoState] = useState([]);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isBuscadorActive, setIsBuscadorActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  useEffect(() => {
    const fetchPeliculas = () => {
      axios.get('https://blogpelis-back.onrender.com/api/peliculas/')
        .then(response => {
          setListadoState(response.data);
        })
        .catch(error => {
          console.error('Hubo un error al obtener las películas:', error);
          toast.error('Hubo un error al obtener las películas.');
        });
    };

    fetchPeliculas(); // Fetch initial data

    const intervalId = setInterval(() => {
      if (!isBuscadorActive) {
        fetchPeliculas();
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [isBuscadorActive]);

  return (
    <div className={`layout ${isSidebarActive ? 'sidebar-active' : ''}`}>
      <nav className="nav__react">
        <div className="logo__nav">
          <img className="nav__logo" src={iv7logo} alt="logo_nav" />
        </div>

        <ul className="nav__list">
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Inicio" />
            <a className="nav__link" href="#index">Inicio</a>
          </li>
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Peliculas" />
            <a className="nav__link" href="#movies">Peliculas</a>
          </li>

          <li className="nav__item">
            <Buscador listadoState={listadoState} setListadoState={setListadoState} setIsBuscadorActive={setIsBuscadorActive} />
          </li>

          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Blog" />
            <a className="nav__link" href="#frases">Frases</a>
          </li>
          <li className="nav__item">
            <img className="nav__icon" src={lightsaber} alt="Icono Contacto" />
            <a className="nav__link" href="#personajes">Personajes</a>
          </li>
        </ul>
        <audio id="hover-sound" src="/sounds/Lightsaber.mp3" preload="auto"></audio>
      </nav>

      <NavWithSound />

      <header className="header__react" id='index'>
        <div className="star-background"></div>
        <StarScroll />
        <div className="bolaNavidad"></div>
        <div className="xwing">
          <img src={xwing} className="img__x" alt="xwing" />
        </div>
        <div className="falcon"></div>
        <div className="caza-tie"></div>
        <audio id="hover-sound2" src="/sounds/intro.mp3" preload="auto"></audio>
      </header>

      <PersonajesList />

      <Cards />

      <main className="main__react" id='movies'>
        <section className="main__content">
          <h2 className="title__section">Filmografia</h2>
          <Listado listadoState={listadoState} setListadoState={setListadoState} />
        </section>
        <ToggleSidebarButton toggleSidebar={toggleSidebar} />
        <aside className={`main__sidebar ${isSidebarActive ? 'active' : ''}`}>
          <div className="forms__sec">
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
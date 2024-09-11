import { useEffect } from 'react';

const NavWithSound = () => {
    useEffect(() => {
        const hoverSound = document.getElementById("hover-sound");
        const navLinks = document.querySelectorAll(".nav__link");

        const handleMouseOver = () => {
            hoverSound.currentTime = 0; // Reiniciar el sonido
            hoverSound.play().catch((error) => {
                console.error("Error al reproducir el sonido:", error);
            });
        };

        navLinks.forEach((link) => {
            link.addEventListener("mouseover", handleMouseOver);
        });

        // Cleanup function to remove event listeners
        return () => {
            navLinks.forEach((link) => {
                link.removeEventListener("mouseover", handleMouseOver);
            });
        };
    }, []);

    return null; // No renderiza nada ya que la parte de navegación está en App.js
};

export default NavWithSound;
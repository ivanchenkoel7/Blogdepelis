import React from 'react';

const PersonajeCard = ({ personaje }) => {
  // Definir el estilo de text-shadow basado en el color del personaje
  const textShadowStyle = {
    force: { textShadow: '0 0 10px #ecf805, 0 0 20px #ecf805' },
    'jedi azul': { textShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF' },
    'jedi verde': { textShadow: '0 0 10px #00FF00, 0 0 20px #00FF00' },
    sith: { textShadow: '0 0 10px #FF4500, 0 0 20px #FF4500' }
  };

  return (
    <div className={`personaje ${personaje.color}-border`} id={personaje.color}>
      <img
        src={`data:image/webp;base64,${personaje.image_base64}`}
        className="img__personaje"
        alt={`Imagen de ${personaje.nombre}`}
      />
      <h3 className={`name__personaje ${personaje.color}-text`}>{personaje.nombre}</h3>
      <p className="description__personaje" style={textShadowStyle[personaje.color]}>
        {personaje.descripcion}
      </p>
    </div>
  );
};

export default PersonajeCard;
import React from "react";

const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    creado,
    descripcion,
    empresa,
    nombre,
    url,
    image,
    votos,
  } = producto;
  return (
    <li>
      <div>
        <div>
          <img src={image} />
        </div>
        <div>
          <h2>{nombre}</h2>
        </div>
      </div>
      <div></div>
    </li>
  );
};

export default DetallesProducto;

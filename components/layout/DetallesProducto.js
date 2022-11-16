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
  return <h2>hola</h2>;
};

export default DetallesProducto;

// <li>
// <div>
//   <div>
//     <img src={img} />
//   </div>
//   <div>
//     <h2>{nombre}</h2>
//   </div>
// </div>
// <div></div>
// </li>

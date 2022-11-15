import React from "react";
import styled from "@emotion/styled";
/** @jsxImportSource @emotion/react */
import { jsx, css, Global, ClassNames } from "@emotion/react";
const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
`;
const InputSubmit = styled.button`
  height: 4rem;
  width: 4rem;
  display: block;
  background-size: 4rem;
  background-image: url("/Static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 1px;
  bottom: 1px;
  background-color: white;
  border: none;
  text-indent: -99999999px;

  &:hover {
    cursor: pointer;
  }
`;

const Buscar = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Buscar Productos" />
      <InputSubmit type="submit">Buscar</InputSubmit>
    </form>
  );
};

export default Buscar;

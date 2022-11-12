import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Formulario, Campo, InputSubmit } from "../components/ui/Formulario";

//validaciones
import useValidacion from "../hooks/useValidacion";

const STATE_INICIAL = {
  nombre: "",
  email: "",
};

export default function CrearCuenta() {
  const {} = useValidacion(STATE_INICIAL);
  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          CrearCuenta
        </h1>
        <Formulario>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              name="nombre"
            />
          </Campo>
          <Campo>
            <label htmlFor="nombre">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
            />
          </Campo>
          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
            />
          </Campo>
          <InputSubmit type="submit" value="Cear Cuenta" />
        </Formulario>
      </>
    </Layout>
  );
}

import Layout from "../components/layout/Layout";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { css } from "@emotion/react";
import {
  Error,
  Formulario,
  Campo,
  InputSubmit,
} from "../components/ui/Formulario";
import firebase from "../firebase";
//validaciones
import useValidacion from "../hooks/useValidacion";
import validarLogin from "../validacion/validarLogin";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarLogin, loginUser);

  const { email, password } = valores;
  async function loginUser() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Es gab ein fehler", error.message);
      setError(error.message);
    }
  }

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Iniciar Sesión
        </h1>
        <Formulario onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}

          <Campo>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}

          <InputSubmit type="submit" value="Iniciar Sesión" />
          {error && <Error>{error}</Error>}
        </Formulario>
      </>
    </Layout>
  );
};
export default Login;

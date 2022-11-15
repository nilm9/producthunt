import Layout from "../components/layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
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
import validarCrearCuenta from "../validacion/validarLogin";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;
  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      router.push("/");
    } catch (error) {
      console.error("Hubo un error al crear el usuario", error);

      console.log("hola");
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
          CrearCuenta
        </h1>
        <Formulario onSubmit={handleSubmit}>
          <Campo>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
          <Campo>
            <label htmlFor="nombre">Email</label>
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

          <InputSubmit
            type="submit"
            value="Crear Cuenta"
            // onClick={() => console.log("hola")}
          />
          {error && <Error>{error}</Error>}
        </Formulario>
      </>
    </Layout>
  );
};

export default CrearCuenta;

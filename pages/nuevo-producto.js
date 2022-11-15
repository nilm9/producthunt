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
  empresa: "",
  img: "",
  url: "",
  descripcion: "",
};
const NuevoProducto = () => {
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

  const { nombre, empresa, img, url, descripcion } = valores;
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
          Crear Nuevo Producto
        </h1>
        <Formulario onSubmit={handleSubmit} noValidate>
          <filedset>
            <legend>Info general</legend>
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
              <label htmlFor="empresa">Empresa</label>
              <input
                type="text"
                id="empresa"
                placeholder="Empresa"
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}

            <Campo>
              <label htmlFor="img">Imagen</label>
              <input
                type="file"
                id="img"
                name="img"
                value={img}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.img && <Error>{errores.img}</Error>}

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                placeholder="url"
                name="url"
                value={url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
          </filedset>
          <filedset>
            <legend>Sobre tu Producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripcion</label>
              <input
                id="descripcion"
                name="descripcion"
                value={descripcion}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
            <InputSubmit type="submit" value="Crear Producto" />
            {error && <Error>{error}</Error>}
          </filedset>
        </Formulario>
      </>
    </Layout>
  );
};
export default NuevoProducto;

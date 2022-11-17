import Layout from "../components/layout/Layout";
import { useState, useContext } from "react";
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
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  getStorage,
} from "firebase/storage";
import { v4 } from "uuid";

const STATE_INICIAL = {
  nombre: "",
  empresa: "",
  image: "",
  url: "",
  descripcion: "",
};
const NuevoProducto = () => {
  const [error, setError] = useState(false);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, url, descripcion } = valores;

  //hook de routing para
  const router = useRouter();

  //Context w CRUD OPERATIONS of fb
  const { usuario, firebase, db } = useContext(FirebaseContext);

  const [fbError, setFbError] = useState(false);
  const [image, setImage] = useState(null);
  const handleFile = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const storage = getStorage();

  const handleUpload = async () => {
    const path = `productos/${image.lastModified}${image.name}`;
    const uploadTask = ref(storage, path);
    uploadBytes(uploadTask, image).then(alert("done"));

    const downloadURL = await getDownloadURL(ref(storage, path));
    return downloadURL;
  };

  async function crearProducto() {
    if (!usuario) {
      return router.push("/login");
    }

    const nuevoProducto = {
      nombre,
      empresa,
      url,
      image: await handleUpload(),
      descripcion,
      votos: 0,
      comentarios: [],
      data: Date.now(),
    };

    // insertarlo en la db
    await setDoc(doc(db, "productos", nuevoProducto.nombre), nuevoProducto);

    // await firebase.db.collection("productos").add(nuevoProducto);
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
              <label htmlFor="image">Imagen</label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                onInput={(e) => handleFile(e)}
              />
              <img src={url} />
            </Campo>
            {errores.image && <Error>{errores.image}</Error>}

            <Campo>
              <label htmlFor="url">URL</label>
              <input
                type="url"
                id="url"
                placeholder="URL de tu producto"
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
            {errores.url && <Error>{errores.descripcion}</Error>}
            <InputSubmit type="submit" value="Crear Producto" />
            {error && <Error>{error}</Error>}
          </filedset>
        </Formulario>
      </>
    </Layout>
  );
};
export default NuevoProducto;

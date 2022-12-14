import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [productos, guardarProductos] = useState([]);

  const { firebase, db } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      guardarProductos(productos);
    };
    obtenerProductos();
  }, []);

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map((producto) => {
                <DetallesProducto key={producto.id} producto={producto} />;
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

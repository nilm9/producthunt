import { useEffect, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import DetallesProducto from "../components/layout/DetallesProducto";
export default function Home() {
  const [productos, guardarProductos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(firebase.db, "usuarios"));
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const productoss = querySnapshot.forEach((doc) => {
        log;
      });
      guardarProductos(productos);
    };
    obtenerProductos();
  }, []);
  console.log(productos);

  return (
    <Layout>
      <div className="listado-productos">
        <div className="contenedor">
          <div className="bg-white">
            {productos.map((producto) => {
              <DetallesProducto />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = app.auth(); //tenir laauth per tota la app
  }
  //Registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      nombre,
      email,
      password
    );
  }
}

const firebase = new Firebase();
export default firebase;

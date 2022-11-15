import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth(); //tenir laauth per tota la app
  }
  //Registra un usuario
  async registrar(nombre, email, password) {
    console.log(email);
    try {
      const nuevoUsuario = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return await updateProfile(nuevoUsuario.user, {
        displayName: nombre,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //user login
  login(email, password) {
    const auth = getAuth();
    const usuario = signInWithEmailAndPassword(auth, email, password);

    return usuario;
  }
}

const firebase = new Firebase();
export default firebase;

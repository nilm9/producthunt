export default function validarCrearCuenta(valores) {
  let errores = {};

  //Validar el nombre del usuario

  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  //Validar el psw
  if (!valores.password) {
    errores.password = "Password no válido";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe ser de a menos 6 caracteres ";
  }

  return errores;
}

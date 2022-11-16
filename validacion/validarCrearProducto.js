export default function validarCrearProducto(valores) {
  let errores = {};

  //Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!valores.empresa) {
    errores.empresa = "Empresa es obligatoria";
  }

  //Validar url
  if (!valores.url) {
    errores.url = "URL obligatoria";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL no válida";
  }

  //Validar url
  if (!valores.descripcion) {
    errores.descripcion = "descripcion obligatoria";
  }

  return errores;
}

import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState([]);
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length == 0;
      if (noErrores) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errores]);

  //Funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const guardarErrores = validar(valores);

    setErrores(guardarErrores);

    setSubmitForm(true);
  };

  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
  };
  return {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  };
};

export default useValidacion;

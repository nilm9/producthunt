import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
    const [valores, setValores] = useState([]);
    const [errores, setErrores] = useState([]) = useState({});
    const [submitForm, setSubmitForm] = useState(false)

    useEffect(()=>{
        if(submitForm){
            const noErrores = Object.keys(errores).length==0;
            if(noErrores){
                fn(); 
            }
            setSubmitForm(false);
        }
    }, []);


    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleCahnge = e => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e =>{
        e.preventDefault();
        const guardarErrores = validar(valores);
        setErrores(guardarErrores)
        setSubmitForm(true);
    }



    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleCahnge
    }
}

export default useValidacion;
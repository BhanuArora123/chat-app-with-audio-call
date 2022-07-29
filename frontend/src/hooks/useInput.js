import { useEffect } from "react";
import { useState } from "react"

const useInput = (inputs, isFormTouched) => {
    const [isValid , setIsValid] = useState(false);
    const fieldsNotValid = [];
    const formIsNotValid = isFormTouched && !isValid ;
    for (const it in inputs) {
        fieldsNotValid.push(inputs[it].isTouched && !(inputs[it].condition));
    }
    useEffect(() => {
        let Valid = true;
        for (const key in inputs) {
            Valid = Valid && inputs[key].condition;
        }
        setIsValid(Valid && isFormTouched);
    },[ inputs , isFormTouched ]);
    return { fieldsNotValid ,isValid ,formIsNotValid };
}

export default useInput;
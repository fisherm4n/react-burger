import { useState } from "react";
const useForm = (inputValues) => {
    const [values, setValues] = useState(inputValues);
    console.log(values);
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
};
export default useForm;

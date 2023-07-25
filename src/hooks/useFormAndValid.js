import { useState } from 'react';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(false);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setValid(evt.target.closest('form').checkValidity());
  };

  
  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setValid,
  };
}

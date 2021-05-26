import { useState } from "react";

const useForm = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    city: "",
    country: "",
    address: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return { handleChange, values, setValues, handleClickShowPassword };
};

export default useForm;

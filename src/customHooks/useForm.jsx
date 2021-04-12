import {useState} from 'react';

const useForm =(validate)=>{
    const[values,setValues]=useState({
        email:'',
        password:''
    })
    const[errors,setErrors]=useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange =e =>{
        const{name,value}=e.target;
        setValues({
            ...values,
            [name]: value
        })
        setErrors("");
    };
    const handleSubmit =e=>{
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    }
    return{handleChange,values, handleSubmit, errors,isSubmitting }
}

export default useForm;









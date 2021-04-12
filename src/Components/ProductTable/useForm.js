import {useState} from 'react';

const useForm =(props_values)=>{
    const[values,setValues]=useState(props_values || {
        name: '',
        rawPrice: 1,
        price: 0,
        code: '',
        categoryId:0,
        description:"",
        stockCount:"",
        expirationDate:''
    })

    const handleChange =e =>{
        const{name,value}=e.target;
        setValues({
            ...values,
            [name]: value
        })
    };
   
    return{handleChange,values,setValues}
}

export default useForm;



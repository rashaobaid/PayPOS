import {useState} from 'react';

const useForm =()=>{
    const[values,setValues]=useState({
        name: '',
        rawPrice: 1,
        price: 0,
        code: '',
        categoryId:0,
        description:"",
        stockCount:"",
        expirationDate:'',
        file: {}
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



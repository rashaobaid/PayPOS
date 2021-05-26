import React ,{useState}from "react";
import { styled } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
const DateFilter = () => {
  const ApplyFilterButton = styled(Button)({
    textTransform: "unset",
    backgroundColor: "white",
    border: ".1px solid #ccc",
    color: "black",
    marginLeft: "2%",
    display:'inline'
  });
  const LabelSpan = styled("span")({
    color: "#555",
    fontWeight: "bold",
    fontFamily: "Calibri",
    marginLeft: "2%",
    marginRight: "2em",
  });
  const[values,setValues]=useState({
    toDate:''||"2017-05-24",
    fromDate:''||"2017-05-24"
})
const handleChange =e =>{
  const{name,value}=e.target;
  setValues({
      ...values,
      [name]: value
  })
};
  return (
    <span>
        <LabelSpan>Expiration Date</LabelSpan>
        <LabelSpan>From</LabelSpan>
        <TextField
          type="date"
          name="fromDate"
          value={values.fromDate}
          onChange={handleChange}
        />
        <LabelSpan>To</LabelSpan>
        <TextField
          type="date"
          name="toDate"
          value={values.toDate}
          onChange={handleChange}
        />
     <ApplyFilterButton variant="contained">Apply Filter</ApplyFilterButton>
    </span>
  );
};
export default DateFilter;
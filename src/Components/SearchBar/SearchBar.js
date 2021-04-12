import React,{useState} from 'react'
import { InputAdornment, OutlinedInput, IconButton, Box } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { connect } from "react-redux";
import * as categoriesActions from "../../store/actions/categories";
const SearchBar = ({calculcateFilterdItems,clearFilterText}) => {
    const [filterText, setFilterText] = useState('');
    const handleChangefilterText = e => {setFilterText(calculcateFilterdItems(e.target.value)) }; 
    const handleclearFilterText = () => {
        setFilterText("")
        clearFilterText("")
    }; // not effect the reducer text_filtered
    return (
        <Box>
        <OutlinedInput
            placeholder="Search..."
            onChange={handleChangefilterText}
            value={filterText}
            startAdornment={
                <InputAdornment position="start">
                    <Search />
                </InputAdornment>
            }
            endAdornment={
                <IconButton position="end" onClick={handleclearFilterText} >
                    <Close />
                </IconButton>
            }
        />
       
    </Box>
    )
}
const mapStateToProps = (state) => {
    return {
        flltered_data: state.categories.flltered_data, 
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        calculcateFilterdItems:(filterText)=> dispatch(categoriesActions.calculcateFilterdItems(filterText)),
        clearFilterText:(filterText)=> dispatch(categoriesActions.handleclearFilterText(filterText)),
    };
  };
  export default connect( mapStateToProps, mapDispatchToProps)(SearchBar);
  

import React, { useState } from 'react'
import { InputAdornment, OutlinedInput, IconButton, Box } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import { useLocation } from "react-router-dom";
import DateFilter from './DateFilter';

const SearchBar = ({ onChangeTextFilter, onClearFilterText }) => {
    const location = useLocation();
    const [filterText, setFilterText] = useState('');
    const handleChangefilterText = e => {
        const text = e.target.value;
        setFilterText(text)
        onChangeTextFilter(text)
    };
    const handleclearFilterText = () => {
        setFilterText("")
        onClearFilterText("")
    };
    return (
        <div >
            {/* {location.pathname === '/products' && (<DateFilter />)} */}
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
        </div>
    )
}
export default SearchBar;


import React from 'react'
import {Search,Close} from "@material-ui/icons";
import {styled,OutlinedInput,InputAdornment,IconButton,} from "@material-ui/core";
  const SearchBar = styled(OutlinedInput)({
    width: "95%",
    height: "50px",
    marginTop: "1em",
    marginLeft: "1em",
    backgroundColor: "white",
    borderRadius: "0.3em",
  });
  const ProductsSearchBar = ({handleclearFilterText,onSearchTextChanged, filterText}) => {
    return (
      <SearchBar
        id="input-with-icon-adornment"
        placeholder="Search..."
        onChange={(e) => {console.log(e); onSearchTextChanged(e.target.value)}}
        value={filterText}
        startAdornment={
          <InputAdornment position="start">
            <Search/>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={(e) => handleclearFilterText()}>
              <Close />
            </IconButton>
          </InputAdornment>
        }
      />
    );
};
export default ProductsSearchBar;
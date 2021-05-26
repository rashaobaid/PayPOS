import React from "react";
import SearchBar from "../Components/SearchBar/SearchBar";
import CategoriesTable from "../Components/CategoriesTable/CategoriesTable";
import { makeStyles } from "@material-ui/core/styles";
import EditAddRow from "../Components/CategoriesTable/EditAddRow";
import { connect } from "react-redux";
import * as categoriesActions from "../store/actions/categories";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
  },
}));
const CategoriesPage = ({ calculcateFilterdItems, clearFilterText }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <EditAddRow title="Add Category" />
        <SearchBar
          onChangeTextFilter={calculcateFilterdItems}
          onClearFilterText={clearFilterText}
        />
      </div>
      <CategoriesTable />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculcateFilterdItems: (filterText) =>
      dispatch(categoriesActions.calculcateFilterdItems(filterText)),
    clearFilterText: (filterText) =>
      dispatch(categoriesActions.handleclearFilterText(filterText)),
  };
};
export default connect(null, mapDispatchToProps)(CategoriesPage);

import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as categoriesActions from "../../store/actions/categories";
import userStyles from "./style";
import  EditAddRow from './EditAddRow';
import ECTable from '../UtilsComponents/ECTable';
const CategoriesTable = ({ categories, onInitCategories,onDeleteCategory, flltered_data, filter_text }) => {
  const classes = userStyles();
  const tableRows = React.useMemo(()=> filter_text === '' ? categories : flltered_data, [categories, filter_text])
  useEffect(() => {
    onInitCategories();
  }, []);
  
  return (
    <ECTable 
      headers={['Category Name', 'CreatedAt', 'Action']}
      onDeleteCallback={onDeleteCategory}
      tableRows={tableRows}
      editComponent={(row_props) => <EditAddRow {...row_props}/>}
      rowKeys={['name', 'date']}
      customStyle={classes}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    flltered_data: state.categories.flltered_data,
    filter_text: state.categories.filter_text
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitCategories: () => dispatch(categoriesActions.fetchCategories()),
    onDeleteCategory:(id)=> dispatch(categoriesActions.deleteCategoryById(id)),

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTable);


import React from 'react'
import SearchBar from '../Components/SearchBar/SearchBar';
import CategoriesTable from '../Components/CategoriesTable/CategoriesTable'
import { makeStyles } from '@material-ui/core/styles';
import EditAddRow from '../Components/CategoriesTable/EditAddRow';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(3),
    }
}));
const CategoriesPage = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.container}>
                <EditAddRow title="Add Category"/>
                <SearchBar/>
            </div>
            <CategoriesTable />
        </>
    )
};

export default CategoriesPage;
import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import TableRowComponent from './TableRowComponent';

const ECTable = ({ headers, onDeleteCallback, editComponent, tableRows, rowKeys, customStyle }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setPage(0)
    }, [tableRows]);

    return (
        <TableContainer component={Paper} className={customStyle?.tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((item, index) => {
                            return (<TableCell key={`header_${index.toString()}`}>{item}</TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRowComponent
                        page={page}
                        rowsPerPage={rowsPerPage}
                        items={tableRows}
                        onDeleteCallback={onDeleteCallback}
                        editComponent={editComponent}
                        keys={rowKeys}
                    />

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        // component="div"
                        count={Object.keys(tableRows).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableBody>


            </Table>
        </TableContainer>
    )
}

export default ECTable;
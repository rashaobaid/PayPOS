import React from 'react'
import { TableCell, TableRow, Button } from '@material-ui/core';
import DeleteRow from './DeleteRow'
import { Edit } from '@material-ui/icons';

const TableRowComponent = ({ items, keys, onDeleteCallback, editComponent, rowsPerPage, page }) => {
  return (
    <>
      {
        // {10: {} , 5: {}} => [[10, {}]]
        Object.entries(items).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
          const [_, values] = item
          return (
            <TableRow key={`item_${index.toString()}`}>
              {
                keys.map((key, cell_index) =>
                  <TableCell
                    key={`cell_${cell_index.toString()}`}
                  >
                    {values[key]}
                  </TableCell>)
              }
              <TableCell>
                <span style={{ display: 'inline-flex' }}>
                  <DeleteRow onDeleteCallback={onDeleteCallback} id={values.Id} />
                  { editComponent({id: values.Id, isEdit: true, ...values}) }
                  {/* {!!editComponent ? editComponent({ id: values.Id, isEdit: true, ...values }) : <Button color="primary" variant="outlined" size="large"><Edit /></Button>} */}
                </span>
              </TableCell>
            </TableRow>)
        })}
    </>
  )
}

export default TableRowComponent;
import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import userStyles from "./style";
import { Edit } from "@material-ui/icons";
import { connect } from "react-redux";
import * as categoriesActions from "../../store/actions/categories";
import { SnackbarContext } from "../../customHooks/snackbarContext/SnackbarProvider";

const EditAddRow = (props) => {
  const {
    isEdit,
    error,
    onEditCategory,
    onAddCategory,
    message,
    closeDialog,
    id,
    title,
    name,
  } = props;
  const classes = userStyles();
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(name || "");
  const { openSnackbar } = React.useContext(SnackbarContext);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeDiaglogSync = async () => {
    // async call
    await handleClose(); // wait until this job finish
    closeDialog(); // do this after wards
  };
  useEffect(() => {
    if (!open || !message || message === "") return;

    openSnackbar({
      open: true,
      message: message,
      type: "success",
    });
    closeDiaglogSync();
  }, [message]); // run again message updated

  useEffect(() => {
    "";
    setCategoryName(name);
  }, [name]);
  return (
    <>
      <div>
        {isEdit ? (
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={handleClickOpen}
          >
            <Edit />
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClickOpen}
          >
            {title}
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <form>
            <DialogTitle className={classes.title}>
              {isEdit ? "Edit Category" : "Add Catedory"}
            </DialogTitle>
            <DialogContent className={classes.content}>
              <DialogContentText>Categore Name</DialogContentText>
              <TextField
                autoFocus
                variant="outlined"
                id="name"
                placeholder="Categore Name"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <p style={{ color: "red" }}>{error}</p>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  isEdit
                    ? onEditCategory(id, categoryName)
                    : onAddCategory(categoryName);
                  setCategoryName("");
                }}
              >
                {isEdit ? "Save" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    error: state.categories.error,
    message: state.categories.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEditCategory: (id, categoryName) =>
      dispatch(categoriesActions.editCategoryById(id, categoryName)),
    onAddCategory: (category) =>
      dispatch(categoriesActions.addCategory(category)),
    closeDialog: () => dispatch(categoriesActions.closeDialog()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAddRow);

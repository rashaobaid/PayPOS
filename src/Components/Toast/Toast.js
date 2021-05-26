import { Snackbar } from "@material-ui/core";
import React from "react";
import { SnackbarContext } from "../../customHooks/snackbarContext/SnackbarProvider";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = () => {
  const { open, message, type, closeSnackbar } =
    React.useContext(SnackbarContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={closeSnackbar}
      messageAlert={message}
    >
      <Alert onClose={closeSnackbar} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

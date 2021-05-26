import React from "react";

export const SnackbarContext = React.createContext({
  open: false,
  message: "",
  type: "",
  openSnackbar: () => {},
  closeSnackbar: () => {},
});

const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("");
  const openSnackbar = ({ message, type }) => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };
  const closeSnackbar = () => setOpen(false);

  const initValues = {
    open,
    message,
    type,
    openSnackbar,
    closeSnackbar,
  };

  return (
    <SnackbarContext.Provider value={initValues}>
      {children}
    </SnackbarContext.Provider>
  );
};
export default SnackbarProvider;

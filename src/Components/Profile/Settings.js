import React, { useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { connect } from "react-redux";
import useForm from "./useForm";
import * as authActions from "../../store/actions/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "10px",
    "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
      paddingLeft: "30px",
    },
    "& .MuiGrid-spacing-xs-2": {
      paddingBottom: "6em",
    },
  },
  title: {
    fontFamily: "emoji ",
    marginTop: "inherit ",
    fontSize: "medium",
    "& h2": {
      marginBottom: "0px",
    },
    "& p": {
      color: "#808082ed",
      marginTop: "0px",
    },
  },
  textField: {
    width: "25ch",
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    display: "flex",
    "& .MuiButton-containedPrimary ": {
      marginRight: "1em",
    },
  },
  errorMesage: {
    color: "red",
  },
}));
const Settings = ({ error, authData, onEditUserInfo }) => {
  const classes = useStyles();
  const { handleChange, values, setValues, handleClickShowPassword } =
    useForm();
  useEffect(() => {
    if (!authData.Id) return;
    setValues({ ...authData });
  }, [authData, setValues]);

  console.log("error", error);
  // const [values, setValues] = React.useState({
  //   password: "",
  //   showPassword: false,
  // });
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Paper>
        <form>
          <Grid container spacing={2} xs={12} sm={8}>
            <Grid item xs={12} sm={12} className={classes.title}>
              <h2>Edit Profile</h2>
              <p>Change User Information here</p>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="filled-required"
                label="First Name"
                variant="outlined"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
              />
              {error?.first_name && (
                <Typography className={classes.errorMesage}>
                  {error.first_name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="filled-required"
                label="Last Name"
                variant="outlined"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
              />
              {error?.last_name && (
                <Typography className={classes.errorMesage}>
                  {error.last_name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="filled-required"
                label="Email"
                variant="outlined"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {error?.email && (
                <Typography className={classes.errorMesage}>
                  {error.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="filled-required"
                label="Address"
                variant="outlined"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {error?.address && (
                <Typography className={classes.errorMesage}>
                  {error.address}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                id="filled-required"
                label="Contacts Number"
                variant="outlined"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
              />
              {error?.phone_number && (
                <Typography className={classes.errorMesage}>
                  {error.phone_number}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="filled-required"
                label="City"
                variant="outlined"
                name="city"
                value={values.city}
                onChange={handleChange}
              />
              {error?.city && (
                <Typography className={classes.errorMesage}>
                  {error.city}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="filled-required"
                label="Country"
                variant="outlined"
                name="country"
                value={values.country}
                onChange={handleChange}
              />
              {error?.country && (
                <Typography className={classes.errorMesage}>
                  {error.country}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              {error?.password && (
                <Typography className={classes.errorMesage}>
                  {error.password}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={12} className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onEditUserInfo(values);
                }}
              >
                Save
              </Button>
              <Button variant="contained" color="secondary">
                Cancle
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    //user: state.auth.user,
    authData: state.auth.authData,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEditUserInfo: (data) => dispatch(authActions.editUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

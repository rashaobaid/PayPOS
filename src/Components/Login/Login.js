import React from 'react';
import { Button, TextField, Link, Grid, Box, Typography} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import userStyles from "./style";
import useForm from '../../customHooks/useForm';
import validate from '../../customHooks/validateInfo';
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";
import { useHistory } from 'react-router';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        E-Commerce
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = ({login,message,error}) => {
  const classes = userStyles();
  const {handleChange,values, handleSubmit , errors, isSubmitting} =useForm(validate);
  const history = useHistory()

  React.useEffect(() => {
    if(isSubmitting && !error && Object.keys(errors).length == 0) 
        history.push('/main')
  },[error, errors, isSubmitting])
  return (
    <Grid container className={classes.container} >
      <Grid item >
          <form onSubmit={handleSubmit } className={classes.paper}>
            <Typography component="h1" variant="h5">
                Login to Your Account
            </Typography>
           {error &&<Alert className={classes.alert}  severity="error">{error}</Alert>}
           {message&&<Alert  className={classes.alert} severity="success">{message}</Alert>}
            <TextField
              variant="outlined"
              fullWidth
              className={classes.input}
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <Typography className={classes.error}>{errors.email}</Typography>}
            <TextField
              variant="outlined"
              fullWidth
              className={classes.input}
              name="password"
              label="Password"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
            />
             {errors.password && <Typography className={classes.error}>{errors.password}</Typography>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              className={classes.submit}
              onClick={()=>login(values)}
            >
              Login
          </Button>
            <Box mt={3}>
                <Copyright />
            </Box>
          </form>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return { 
    message:state.auth.message,
    error:state.auth.error
   }
};
const mapDispatchToProps = (dispatch) => {
  return {
    login:(values) => dispatch(authActions.login(values)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

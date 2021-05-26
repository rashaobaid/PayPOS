import React, { useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/auth";

const useStyles = makeStyles((_) => ({
  root: {
    marginLeft: "10px",
    "& .MuiGrid-spacing-xs-2 > .MuiGrid-item": {
      paddingLeft: "30px",
    },
    "& .MuiGrid-spacing-xs-2": {
      paddingBottom: "5em",
    },
  },
  title: {
    fontFamily: "emoji ",
    marginTop: "inherit ",
    fontSize: "medium",
  },
  subTitle: {
    fontFamily: "emoji",
    margin: "0px",
    "& h3 ,p": {
      margin: "3px",
      marginBottom: "7px",
    },
    "& p": {
      color: "#808082ed",
    },
  },
  label: {
    marginRight: "1em",
  },
  span: {
    color: "#787da3",
    fontFamily: "cursive",
  },
}));
const PersonalInfo = ({ authData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} className={classes.title}>
            <h2>About You</h2>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.subTitle}>
            <h3>Name & address</h3>
            <p>This information will appear by default your checkout</p>
          </Grid>
          <Grid item xs={12} sm={12}>
            <label className={classes.label}>
              <strong>Full name: </strong>
            </label>
            <span className={classes.span}>
              {" "}
              {`${authData.first_name} ${authData.last_name}`}
            </span>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.subTitle}>
            <h3>Business address</h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Email :</strong>
            </label>
            <span className={classes.span}> {`${authData.email}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Phone number: </strong>
            </label>
            <span className={classes.span}>{`${authData.phone_number}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Gender: </strong>
            </label>
            <span className={classes.span}>{`${authData.gender}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>City: </strong>
            </label>
            <span className={classes.span}>{`${authData.city}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Country: </strong>
            </label>
            <span className={classes.span}>{`${authData.country}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Birthdate: </strong>
            </label>
            <span className={classes.span}>{`${authData.birthdate}`}</span>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className={classes.label}>
              <strong>Start_work_date: </strong>
            </label>
            <span
              className={classes.span}
            >{`${authData.start_work_date}`}</span>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authData: state.auth.authData,
  };
};

export default connect(mapStateToProps)(PersonalInfo);

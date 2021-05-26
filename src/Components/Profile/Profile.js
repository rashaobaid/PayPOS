import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Avatar, Paper, Backdrop } from "@material-ui/core";
import profileImage from "../../image/p4.jpg";
import ResponsiveDrawer from "./sidebar";
import CreateIcon from "@material-ui/icons/Create";
import * as authActions from "../../store/actions/auth";

import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "200vh",
  },
  topHead: {
    height: "44vh",
  },
  cover: {
    height: "100%",
    backgroundImage: `url(https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  avater: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    position: "absolute",
    left: 50,
    bottom: -50,
    border: "6px solid white",
  },
  info: {
    position: "absolute",
    left: " 175px",
    bottom: "-63px",
    "& h3 ": {
      marginBottom: "0px",
    },
    "& p ": {
      marginTop: "0px",
    },
  },
  edit: {
    position: "absolute",
    bottom: "-50px",
    left: "51px",
    opacity: 0.5,
    backgroundColor: "#535557",
    color: "#faf4f4",
    "&:hover": {
      opacity: 1,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Profile = ({ authData, onEditUserInfo }) => {
  const classes = useStyles();
  const inputFile = useRef();
  const onEditClick = () => {
    // `current` points to the mounted file input element
    console.log(inputFile.current);
    inputFile.current.click();
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const editProfileImage = (e) => {
    onEditUserInfo({
      ...authData,
      image: e.target.files[0],
    });
  };
  return (
    <Container fixed className={classes.container}>
      <div className={classes.topHead}>
        <Paper className={classes.cover}>
          <div>
            <Avatar
              alt="profileImage"
              src={
                authData.image
                  ? `http://localhost:3001/${authData.image}`
                  : profileImage
              }
              className={classes.avater}
              onClick={handleToggle}
            />
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={editProfileImage}
              style={{ display: "none" }}
            />
            <Avatar alt="profileImage" className={classes.edit}>
              <CreateIcon onClick={onEditClick} />
            </Avatar>
            <div className={classes.info}>
              <h3> {`${authData.first_name} ${authData.last_name}`}</h3>
              <p>{`${authData.city}`}</p>
            </div>
          </div>
        </Paper>
      </div>
      <ResponsiveDrawer />
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <img
          alt="profileImage"
          src={
            authData.image
              ? `http://localhost:3001/${authData.image}`
              : profileImage
          }
          width={400}
          height={400}
        />
      </Backdrop>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    authData: state.auth.authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditUserInfo: (data) => dispatch(authActions.editUserInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

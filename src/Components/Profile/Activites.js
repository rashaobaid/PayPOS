import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@material-ui/lab";

import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import { LocalMall, Receipt, Payment } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
const MapActivityToIcon = {
  product: <LocalMall />,
  category: <Receipt />,
  payment: <Payment />,
};
const Activites = ({ authData }) => {
  const classes = useStyles();
  const [activites, setActivites] = useState([]);
  const getActivites = () => {
    axios
      .get(`http://localhost:3001/activites/${authData.Id}`)
      .then((res) => {
        console.log(res.data);
        setActivites(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getActivites();
  }, []);

  return (
    <Paper>
      <Timeline align="alternate">
        {activites.map((active, index) => (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {active.date}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={index % 2 === 0 ? "primary" : "secondary"}>
                {MapActivityToIcon[active.icon]}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {active.move}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Paper>
  );
};
const mapStateToProps = (state) => {
  return {
    authData: state.auth.authData,
  };
};

export default connect(mapStateToProps)(Activites);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundImage: "linear-gradient(#2a3265, #1e234d)",
    color: "#fff",
    height: "100vh"
  }
}));

export default ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper} >{children}</div>;
};

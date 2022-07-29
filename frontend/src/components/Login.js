import { Button , TextField , Typography, Box, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { makeStyles } from "@mui/styles";
import classes from "./Login.module.css";
import Form from "./Form";
import Signup from "./Signup";
import { Fragment } from "react";
const Login = props => {
    const useStyles = makeStyles({
        bold: {
          fontWeight: "bold"
        }
      });
    return (
        <Box className={classes.loginBox}>
            <Box className={classes.loginHead}>
                <Box className={classes.logoBox}>
                    <img alt="chit chat" src={logo} className={classes.logo}></img>
                    <Typography variant="h3" className={classes.logoHead + " " + classes.boldText}>ChitChat</Typography>
                </Box>
                <Box>
                        <Typography variant="body1" color={"GrayText"} sx={{
                            fontWeight : "bold"
                        }}>Log in with ChitChat to continue</Typography>
                </Box>
            </Box>
            {
                props.routeName === "Login" && <Form></Form>
            }
            {
                props.routeName === "Signup" && <Signup></Signup>
            }
            <Box className={classes["switchAuthType"]}>
                {
                    props.routeName === "Login" &&
                    <Fragment>
                        <Typography variant="body1" className={classes["signupLine"]}>New User ?</Typography>
                        <Link to="/signup" className={classes.link}>Sign Up here</Link>
                    </Fragment>
                }
                {
                    props.routeName === "Signup" &&
                    <Fragment>
                        <Typography variant="body1" className={classes["signupLine"]}>Already Having An Account</Typography>
                        <Link to="/login" className={classes.link}>Login here</Link>
                    </Fragment>
                }
            </Box>
        </Box>
    )
}

export default Login;
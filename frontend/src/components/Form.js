import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Form.module.css";
import { makeStyles } from "@material-ui/styles";
import useInput from "../hooks/useInput";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions, login } from "../store/auth";
import { notiActions } from "../store/noti";
const Form = props => {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [ isEmailTouched , setIsEmailTouched ] = useState(false);
    const [isPasswordTouched , setIsPasswordTouched] = useState(false);
    const [isFormTouched , setFormTouched] = useState(false);
    let inputs = {
        email :{
            value : email,
            condition : email.includes("@"),
            isTouched : isEmailTouched
        },
        password : {
            value : password,
            condition : password.length > 6,
            isTouched : isPasswordTouched
        }
    }
    const { fieldsNotValid ,formIsNotValid , isValid } = useInput(inputs,isFormTouched);
    const isEmailNotValid = fieldsNotValid[0];
    const isPasswordNotValid = fieldsNotValid[1];
    console.log({ isEmailNotValid , isPasswordNotValid ,formIsNotValid , isValid });
    const emailHandler = (event) => {
        setEmail(event.target.value);
        setIsPasswordTouched(true);
        setFormTouched(true);
    }
    const emailFocusHandler = () => {
        setIsEmailTouched(true);
        setFormTouched(true);
    }
    const passFocusHandler = () => {
        setIsPasswordTouched(true);
        setFormTouched(true);
    }
    const passHandler = event => {
        setPassword(event.target.value);
        setIsEmailTouched(true);
        setFormTouched(true);
    }
    // use styles to 
    const useStyles = makeStyles({
        emailStyle : {
            backgroundColor : isEmailNotValid?"pink":"white",
            height : "45px",
            padding : "10px",
            boxSizing : "border-box",
            borderRadius : "7px"
        },
        passStyle : {
            backgroundColor : isPasswordNotValid?"pink":"white",
            height : "45px",
            padding : "10px",
            boxSizing : "border-box",
            borderRadius : "7px"
        },
        bold : {
            fontWeight : "bold"
        }
    });
    // let emailInvalidClass = 
    let styling = useStyles();
    const loginHandler = () => {
        if(isValid){
            dispatch(login(email , password));
        }
        else{
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : isEmailNotValid ? "invalid email" : "password length should be greater than 6"
                }
            }))
        }
    }
    return (
        <Box className={classes.loginForm}>
            <Box className={classes.email}>
                <Typography variant="body1" className={classes.emailLabel} sx={{
                    fontWeight : "bold"
                }}>Email</Typography>
                <TextField id="filled-basic" autoComplete="off" className={classes.emailInput} variant="standard" placeholder="Email" InputProps={{
                    className : styling.emailStyle,
                    startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                }} onChange={emailHandler} onFocus={emailFocusHandler}/>
            </Box>
            <Box className={classes.password}>
                <Box className={classes.passField}>
                    <Typography variant="body1" className={classes.passLabel} sx={{
                    fontWeight : "bold"
                }}>Password</Typography>
                    <Link to="/forgotPassword" className={classes.forgotPassword + " " + classes.link}>Forgot Password</Link>
                </Box>
                <TextField id="filled-basic" autoComplete="new-password" variant="standard" type="password" placeholder="Password" className={classes.passInput} InputProps={{
                    className : styling.passStyle,
                    // autoComplete :"nope",
                    startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      )
                }} onChange={passHandler} onFocus={passFocusHandler} />
            </Box>
            <Box className={classes.loginBtn}>
                {
                    isValid ? 
                <Button variant="contained" onClick={loginHandler}>
                    Login
                </Button> :
                <Button variant="contained" sx={{
                    color : "white",
                    backgroundColor : "gray"
                }}>
                Login
                </Button> 
                }
            </Box>
        </Box>
    )
}

export default Form;
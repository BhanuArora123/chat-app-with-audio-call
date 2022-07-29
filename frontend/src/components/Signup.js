import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";
import { makeStyles } from "@material-ui/styles";
import useInput from "../hooks/useInput";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/auth";
const useStyles = makeStyles({
    multilineColor : {
        backgroundColor : "white",
        height : "45px",
        padding : "10px",
        boxSizing : "border-box",
        borderRadius : "7px"
    },
    bold : {
        fontWeight : "bold"
    }
});
const Signup = props => {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState("");
    const [name , setName] = useState("");
    const [isNameTouched , setIsNameTouched] = useState(false);
    const [password, setPassword] = useState("");
    const [ isEmailTouched , setIsEmailTouched ] = useState(false);
    const [isPasswordTouched , setIsPasswordTouched] = useState(false);
    const [isFormTouched , setFormTouched] = useState(false);
    const signupHandler = () => {
        dispatch(signup(email,password,name));
    }
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
        },
        name : {
            value : name,
            condition : name.length >= 3,
            isTouched : isNameTouched
        }
    }
    const { fieldsNotValid ,formIsNotValid , isValid } = useInput(inputs,isFormTouched);
    const isEmailNotValid = fieldsNotValid[0];
    const isPasswordNotValid = fieldsNotValid[1];
    const isNameNotValid = fieldsNotValid[2];
    console.log({ isEmailNotValid , isPasswordNotValid ,formIsNotValid , isNameNotValid , isValid });
    const emailHandler = (event) => {
        setEmail(event.target.value);
        setIsEmailTouched(true);
        setFormTouched(true);
    }
    const passHandler = event => {
        setPassword(event.target.value);
        setIsPasswordTouched(true);
        setFormTouched(true);
    }
    const nameHandler = event => {
        setName(event.target.value);
        setIsNameTouched(true);
        setFormTouched(true);
    }
    const styling = useStyles();
    return (
        <Box className={classes.loginForm}>
            <Box className={classes.name}>
                <Typography variant="body1" className={classes.nameLabel} sx={{
                    fontWeight : "bold"
                }}>Name</Typography>
                <TextField className={classes.nameInput} autoComplete='off' variant="standard" placeholder="Name" type="text" InputProps={{
                    className : styling.multilineColor,
                    startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon />
                        </InputAdornment>
                      )
                }} onChange={nameHandler}/>
            </Box>
            <Box className={classes.email}>
                <Typography variant="body1" className={classes.emailLabel} sx={{
                    fontWeight : "bold"
                }}>Email</Typography>
                <TextField id="filled-basic" className={classes.emailInput} variant="standard" placeholder="Email" InputProps={{
                    className : styling.multilineColor,
                    startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                }} onChange={emailHandler} type="email"/>
            </Box>
            <Box className={classes.password}>
                <Box className={classes.passField}>
                    <Typography variant="body1" className={classes.passLabel} sx={{
                    fontWeight : "bold"
                }}>Password</Typography>
                    <Link to="/forgotPassword" className={classes.forgotPassword + " " + classes.link}>Forgot Password</Link>
                </Box>
                <TextField id="filled-basic" variant="standard" placeholder="Password" className={classes.passInput} InputProps={{
                    className : styling.multilineColor,
                    startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      )
                }} type="password" onChange={passHandler} />
            </Box>
            <Box className={classes.loginBtn}>
                {
                    isValid ? 
                <Button variant="contained" onClick={signupHandler}>
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

export default Signup;
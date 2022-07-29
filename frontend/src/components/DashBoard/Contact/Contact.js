import { MoreVert } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system"
import logo from "../../../logo.png";
const useStyles = makeStyles({
    hovering : {
        "&:hover" : {
            backgroundColor : "rgb(54,53,52)"
        }
    },
    multilineColor : {
        color : "white"
    }
})
const Contact= props => {
    const classes = useStyles();
    return (
        <Box sx={{
            width : "100%",
            height : "20%",
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
            boxSizing : "border-box",
            padding : "10px",
            cursor : "pointer"
        }} className = {classes.hovering}>
            <Box sx={{
                width : "20%",
                height : "100%",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center"
            }}>
            <Avatar sx={{
                width : "45px",
                height : "45px"
            }} alt="Remy Sharp" src={props.profilePic} />
            </Box>
            <Box sx={{
                width : "80%",
                height : "100%",
                display : "flex",
                alignItems : "center",
                flexDirection : "column"            
            }}>
                <Box sx={{
                    width : "100%",
                    height : "80%",
                    display : "flex",
                    justifyContent : "space-between",
                    alignItems : "center"
                }}>
                <Typography sx={{
                    fontWeight : "bold"
                }}>{props.name}</Typography>
                <MoreVert></MoreVert>
            </Box>
            </Box>
        </Box>
    )
}
export default Contact;
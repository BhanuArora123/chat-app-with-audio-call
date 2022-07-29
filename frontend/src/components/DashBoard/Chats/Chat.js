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
const Chat = props => {
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
        }} className = {classes.hovering} onClick={props.onclick ? props.onclick : () => {}}>
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
            }} alt={props.name} src={props.profilePic} />
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
                    height : "50%",
                    display : "flex",
                    justifyContent : "space-between",
                    alignItems : "center"
                }}>
                <Typography sx={{
                    fontWeight : "bold"
                }}>{props.name}</Typography>
                <Typography>{props.lastMessageTime}</Typography>
            </Box>
            <Box sx={{
                    width : "100%",
                    height : "30%",
                    display : "flex",
                    justifyContent : "flex-start",
                    alignItems : "center"
                }}>
                <Typography variant="body2">{props.desc}</Typography>
            </Box>
            </Box>
        </Box>
    )
}
export default Chat;
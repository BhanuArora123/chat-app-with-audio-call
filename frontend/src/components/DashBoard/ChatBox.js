import { Box } from "@material-ui/core"
import { VideoCall } from "@mui/icons-material";
import { Typography } from "@mui/material";
import MessageBar from "./MessageBox.js/MessageBar";
import MessageBox from "./MessageBox.js/MessageBox";
import SentMessage from "./MessageBox.js/SentMessage";

const ChatBox = props => {
    let urlArray = window.location.href.split("/");
    return (
        <Box sx={{
            width : "66%",
            height : "100%",
            backgroundColor : "rgb(41,40,40)"
        }}>
            <MessageBar name={props.name} chatType={urlArray[urlArray.length - 1]} image={props.image}></MessageBar>
            <MessageBox chatType={urlArray[urlArray.length - 1]}></MessageBox>
            <SentMessage chatType={urlArray[urlArray.length - 1]}></SentMessage>
        </Box>
    )
}
export default ChatBox;
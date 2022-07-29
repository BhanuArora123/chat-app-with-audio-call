import { CloudDownload, Download, FileDownload, InsertDriveFile } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import {saveAs} from "file-saver";
const Message = props => {
    const auth = useSelector(state => state.auth);
    let messageDateTime = props.messageDateTime.split('T');
    const downloadNow = async () => {
        console.log(props.chatId);
        let downloadData = await axios.post("https://chatappbackend123456.herokuapp.com/downloadNow",{
            chatId : props.chatId
        },{
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ auth.token
            },
            responseType:"blob"
        });
        console.log(downloadData);
        // let blobdata = await new Promise(resolve => downloadData.data.toBlob(resolve, 'image/png'));
        saveAs(
            downloadData.data,
            `${props.message.split("-")[props.message.split("-").length - 1]}`
          ); 
    }
    return (
        <Box sx={{
            width : "60%",
            height : props.chatType === "Text"?`${50*(props.message.length/30)+100}px`:"150px",
            backgroundColor : props.bgColor,
            color : props.textColor,
            padding : "20px",
            boxSizing : "border-box",
            margin : "20px",
            borderRadius : "5px"
        }}>
            <Typography variant="body1" sx={{
                width : "100%",
                height : "20%",
                display : "flex",
                justifyContent : "flex-start",
                alignItems : "center",
                textTransform : "capitalize",
                fontWeight : "bold"
            }}>{props.senderName}</Typography>
            <Typography sx={{
                width : "100%",
                height : "70%",
                display : "flex",
                justifyContent : props.chatType === "Text"?"flex-start":"flex-start",
                textAlign : "left",
                alignItems : "center"
            }}>{
                props.chatType === "Text"?props.message : 
                <Box sx={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "flex-start",
                    // backgroundColor : "lightseagreen",
                    alignItems : "center"
                }}>
                    <CloudDownload sx={{
                        width : "40px",
                        height : "40px",
                        marginRight : "10px"
                    }} onClick={downloadNow}></CloudDownload>
                    {
                    props.message.split("-")[props.message.split("-").length - 1]}
                </Box>
            } 
            </Typography>
            <Typography sx={{
                width : "100%",
                height : "10%",
                display : "flex",
                justifyContent : "flex-end",
                alignItems : "center"
            }}>{messageDateTime[0] + "  "+messageDateTime[1].split(".")[0]}</Typography>
        </Box>
    )
}
export default Message;
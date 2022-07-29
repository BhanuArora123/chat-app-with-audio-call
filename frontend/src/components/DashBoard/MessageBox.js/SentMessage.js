import { makeStyles } from "@material-ui/core";
import { EmojiEmotions, FileUpload, FileUploadSharp, Image, Send } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { saveAs} from "file-saver";
import { useRef, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchChats, sendMessage } from "../../../store/chat";
import { notiActions } from "../../../store/noti";
import axios from "axios";
import Modal from "../Modals/Modal";
import EmojiPicker from "./EmojiPicker";
import {fetchGroupChats, sendGroupMessage} from "../../../store/group";
const useStyles = makeStyles({
    button : {
        "&:hover":{
            backgroundColor : "lightgreen"
        }
    }
})
const SentMessage = props => {
    const styling = useStyles();
    const [open, setOpen] = useState(false);
    const groupData = useSelector(state => state.group);
    let chatType = props.chatType;
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };
    const handleToggle = (event) => {
        event.stopPropagation();
        setOpen(!open);
    };
    const [openEmoji, setOpenEmoji] = useState(false);
    const handleCloseEmoji = (event) => {
        event.stopPropagation();
        setOpenEmoji(false);
    };
    const handleToggleEmoji = (event) => {
        event.stopPropagation();
        setOpenEmoji(!open);
    };
    const [fileData , setFileData] = useState();
    const changeFileHandler = (event) => {
        setFileData(event.target.files[0]);
    } 
    const chatData = useSelector(state => state.chat);
    const authData = useSelector(state => state.auth);
    const uploadFileHandler = async () => {
        console.log(fileData);
        let formdata = new FormData();
        if(chatType === "groups"){
            formdata.append("groupName",groupData.groupName);
            formdata.append("creatorId",groupData.groupAdmin);
            formdata.append("email",auth.userData.email);
        }
        formdata.append("chatfile",fileData);
        if(chatType !== "groupS"){
            formdata.append("recipientEmail",chatData.currentEmail);
        }
        let res = await axios.post(`https://chatappbackend123456.herokuapp.com/${chatType === "groups"?"sendGrpMessage":"sendMessage"}`,formdata,{
            headers : {
                "Authorization":"Bearer "+ authData.token
            }
        });
        if(res.status !== 200 && res.status !== 201){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : res.data.msg
                }
            }));
        }  
        if(chatType === "groups"){
            dispatch(fetchGroupChats(auth.token,groupData.groupName,groupData.groupAdmin,groupData.groupId));
        }else{
            dispatch(fetchChats(chatData.currentChatId,chatData.currentUserName,chatData.currentEmail,authData.token));
        }
        setOpen(false);
    }
    const auth = useSelector(state => state.auth);
    const chats = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const [msg , setMsg] = useState();
    const onEmojiClick = (event, emojiObject) => {
        setMsg((msg?msg:"") + emojiObject.emoji);
      };
    const sendMessageHandler = () => {
        if(!msg || msg.length === 0){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : "cannot send an empty msg"
                }
            }))
            return;
        }
        if(chatType === "groups"){
            dispatch(sendGroupMessage(auth.token,auth.userData.email,msg,groupData.groupName,groupData.groupAdmin,groupData.groupId));
        }else{
            dispatch(sendMessage(msg,chats.currentEmail,chats.currentChatId,chats.currentUserName,auth.token));
        }
    }
    const changeHandler = event => {
        setMsg(event.target.value);
    }
    return (
        <Box sx={{
            width : "100%",
            height : "80px",
            borderTop : "0.1px solid gray",
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
            color : "white"
        }}>
            <InputGroup className="mb-3" style={{
                width : "60%",
                height : "100%",
                display : "flex",
                justifyContent : "center",
                alignItems : "center"
            }} onChange={changeHandler}>
                <FormControl style={{
                    backgroundColor : "rgb(56,56,56)",
                    color : "gray",
                    outline : "none",
                    width : "90%",
                    height : "40px",
                    border : "none",
                    paddingLeft : "10px"
                }}
                    placeholder="Enter Message..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={msg}
                />
            </InputGroup>
            <Box sx={{
                display : "flex",
                justifyContent : "space-evenly",
                alignItems : "center",
                width : "40%",
                height : "100%"
            }}>
                <EmojiEmotions onClick={handleToggleEmoji}></EmojiEmotions>
                <FileUpload onClick={handleToggle}></FileUpload>
                <Image onClick={handleToggle}></Image>
                <Button variant="contained" sx={{
                    backgroundColor : "lightgreen"
                }} className={styling.button} onClick={sendMessageHandler}>
                    <Send sx={{
                        color : "black"
                    }}></Send>
                </Button>
            </Box>
            <Modal open={ openEmoji } handleClose={ handleCloseEmoji }>
                <EmojiPicker onEmojiClick={onEmojiClick} ></EmojiPicker>
            </Modal>
            <Modal open={ open } handleClose={ handleClose }>
                <Box sx={ {
                    width: "45%",
                    height: "550px",
                    backgroundColor: "white",
                    zIndex : 10000,
                    position : "relative",
                    color : "black",
                    boxSizing : "border-box",
                    display : "flex",
                    justifyContent : "space-around",
                    alignItems : "center",
                    flexDirection : "column",
                    borderRadius : "10px"
                } } onClick={(e)=>{e.stopPropagation()}}>
                    <Box sx={{
                        width : "50%",
                        display : "flex",
                        justifyContent : "space-evenly",
                        alignItems : "center",
                        height : "15%"
                    }}>
                        <FileUploadSharp sx={{
                            fontSize : "38px"
                        }}/>
                        <Typography variant="h4">Upload File</Typography>
                    </Box>
                    <Box sx={{
                        width : "100%",
                        height : "80%",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "space-around",
                        alignItems : "center"
                    }}>
                        <Box sx={{
                            width : "90%"
                        }}>
                            <TextField id="filled-basic" autoComplete="new-password" variant="outlined" type="file" placeholder="Upload File" label="Upload File" onChange={changeFileHandler} InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FileUpload sx={{
                                            width : "30px",
                                            height : "30px"
                                        }} />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} />
                        </Box>
                        <Box sx={{
                            width : "90%",
                            display : "flex",
                            justifyContent : "flex-start"
                        }}>
                            <Button variant="contained" sx={{
                                height : "45px"
                            }} onClick={uploadFileHandler}>
                                Upload File
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
export default SentMessage;
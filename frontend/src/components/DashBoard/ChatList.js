import { InputAdornment } from "@material-ui/core"
import { Search } from "@mui/icons-material"
import { Box, makeStyles, TextField, Typography } from "@mui/material"
import { useEffect } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { chatActions, fetchChats } from "../../store/chat";
import { getContacts, searchChats } from "../../store/contacts";
import { getSocket } from "../../utils/socketConn";
import Chat from "./Chats/Chat";
import "./scrollbarCSS.css";
const style = {
    multilineColor: {
        color: "white",
        backgroundColor: "rgb(54,53,52)"
    }
};
const ChatList = props => {
    const chats = [
        {
            name: "Contact1",
            desc: "loremkdkkd dkkdsieiie ddfid",
            lastMessageTime: "2:50"
        },
        {
            name: "Contact2",
            desc: "loremkdkkd dkkdsieiie ddfid",
            lastMessageTime: "2:50"
        },
        {
            name: "Contact3",
            desc: "loremkdkkd dkkdsieiie ddfid",
            lastMessageTime: "2:50"
        },
        {
            name: "Contact4",
            desc: "loremkdkkd dkkdsieiie ddfid",
            lastMessageTime: "2:50"
        },
    ];
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contact).contacts;
    const auth = useSelector(state => state.auth);
    const chatData = useSelector(state => state.chat);
    
    useEffect(() => {
        dispatch(getContacts(auth.token));
    }, []);
    const searchChatHandler = (event) => {
        dispatch(searchChats(auth.token, event.target.value));
    }
    const displayChats = (contact) => {
        return () => {
            dispatch(fetchChats(contact._id, contact.name, contact.email, auth.token));
        }
    }
    return (
        <Box sx={ {
            width: "30%",
            height: "600px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            overflow: "scroll"
        } } className="scrollElement">
            <Typography variant="h5" sx={ {
                width: "90%",
                height: "30px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
            } }>Chat</Typography>
            <InputGroup className="mb-3" style={ {
                width: "90%",
                height: "40px",
                backgroundColor: "rgb(54,53,52)",
                color: "white",
                display: "flex"
            } }>
                <div style={ {
                    width: "10%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                } }>
                    <Search sx={ {
                        margin: "auto"
                    } }></Search>
                </div>
                <FormControl
                    placeholder="Search Chats"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    style={ {
                        width: "80%",
                        height: "40px",
                        backgroundColor: "rgb(54,53,52)",
                        color: "white",
                        outline: "none",
                        border: "none",
                        padding: 0
                    } } onChange={ searchChatHandler }
                />
            </InputGroup>
            <Box sx={ {
                height: "70%",
                width: "90%"
            } }>
                {
                    contacts.map(contact => {
                        return (
                            <Chat name={ contact.contactId.name } email={ contact.contactId.email } desc={ contact.contactId.status } lastMessageTime="02:50" key={ contact.contactId._id } onclick={ displayChats(contact.contactId) } profilePic={ contact.contactId.profilePic }></Chat>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
export default ChatList;
import { Box } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../store/chat";
import { groupActions } from "../../../store/group";
import { getSocket } from "../../../utils/socketConn";
import Message from "../Chats/Message";
import "../scrollbarCSS.css";
const MessageBox = props => {
    const groupData = useSelector(state => state.group);
    let chatType = props.chatType;
    const dispatch = useDispatch();
    // const messages = [
    //     {
    //         senderName : "name1",
    //         message : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolor fugiat quos maxime quidem reiciendis quaerat eos soluta ex necessitatibus?",
    //         messageDateTime : "2021-04-22T02:00:00.0Z",
    //         email : "test@gmail.com"
    //     },
    //     {
    //         senderName : "name2",
    //         message : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolor fugiat quos maxime quidem reiciendis quaerat eos soluta ex necessitatibus?",
    //         messageDateTime : "2021-04-22T02:00:00.0Z",
    //         email : "test1@gmail.com"
    //     },
    //     {
    //         senderName : "name3",
    //         message : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolor fugiat quos maxime quidem reiciendis quaerat eos soluta ex necessitatibus?",
    //         messageDateTime : "2021-04-22T02:00:00.0Z",
    //         email : "test2@gmail.com"
    //     }
    // ]
    const auth = useSelector(state => state.auth);
    const chatData = useSelector(state => state.chat);
    let messages = useSelector(state => state.chat).chats;
    // recieving personal chats and group chats;
    let iocon = getSocket();
    if (iocon) {
        iocon.off("new_msg");
        iocon.on("new_msg", (data) => {
            if (chatData.currentEmail === data.sentBy) {
                console.log(data);
                dispatch(chatActions.addChat({ ...data, chatContent: data.chat }));
            }
        })
        iocon.off("group_msg");
        iocon.on("group_msg",(data) => {
            console.log(data);
            if(groupData.groupId === data.groupId){
                let groupChats = Object.assign([],groupData.groupChats);
                groupChats.push({chatId:{...data,chatContent : data.chat}});
                console.log(groupChats);
                dispatch(groupActions.getGroupChats({
                    groupChats : groupChats
                }));
            }
        })
    }
    if (chatType === "groups") {
        messages = groupData.groupChats.map(groupChat => {
            return groupChat.chatId;
        });
    }
    return (
        <Box sx={ {
            width: "100%",
            height: "72%",
            overflowY: "scroll"
        } } className="scrollElement">
            {
                messages.map((message) => {
                    return (
                        <Box sx={ {
                            width: "100%",
                            height: message.chatType === "Text" ? `${50 * (message.length / 30) + 120}px` : "170px",
                            display: "flex",
                            justifyContent: message.sentBy === auth.userData._id ? "flex-end" : "flex-start",
                            alignItems: "center"
                        } }>
                            <Message senderName={ message.sentBy === auth.userData._id ? "You" : (chatType === "groups" ? groupData.groupName : chatData.currentUserName) } bgColor={ message.sentBy === auth.userData._id ? "lightgreen" : "black" } textColor={ message.sentBy === auth.userData._id ? "black" : "white" } message={ message.chatContent } messageDateTime={ message.chatTime } chatType={ message.chatType } chatId={ message._id } key={ message._id } />
                        </Box>
                    )
                })
            }
        </Box>
    )
}
export default MessageBox;
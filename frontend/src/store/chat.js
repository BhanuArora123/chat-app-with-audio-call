import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notiActions } from "./noti";

const chatSlice = createSlice({
    name : "chat",
    initialState : {
        currentChatId : undefined,
        chats : [],
        currentUserName : undefined,
        currentEmail : undefined
    },
    reducers : {
        storeEmailAndChats (state,actions){
            state.currentChatId = actions.payload.id;
            state.chats = actions.payload.chats;
            state.currentEmail = actions.payload.email
        },
        updateCurrentUserName (state,actions) {
            state.currentUserName = actions.payload;
        },
        addChat(state,actions){
            state.chats.push(actions.payload);
        }
    }
})
export const chatActions = chatSlice.actions;
export const fetchChats = (contactId,contactName,email,token) => {
    return async (dispatch) => {
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/displayMessages",
            {
                currentId : contactId
            },
            {
                headers : {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + token
                }
            }
        );
        if(res.status !== 200 && res.status !== 201){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : res.data.message
                }
            }))
            return;
        }
        console.log(res.data);
        dispatch(chatActions.storeEmailAndChats({
            id : contactId,
            chats : res.data.chats,
            email
        }));
        dispatch(chatActions.updateCurrentUserName(contactName));
    }
}
export const sendMessage = (msg,recipientEmail,contactId,contactName,token) => {
    return async (dispatch) => {
        console.log(msg , recipientEmail);
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/sendMessage",{
            msg,
            recipientEmail
        },{
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        })
        if(res.status !== 201 && res.status !== 200){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : res.data.msg
                }
            }));
            return;
        }
        console.log(res);
        dispatch(fetchChats(contactId,contactName,recipientEmail,token));
    }
}
export default chatSlice;
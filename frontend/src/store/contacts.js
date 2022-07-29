import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { chatActions, fetchChats } from "./chat";
import { notiActions } from "./noti";

const contactSlice = createSlice({
    name : "contact",
    initialState : {
        contacts : []
    },
    reducers : {
        addContacts(state,actions){
            state.contacts = actions.payload.contacts;
        }
    }
})
export const contactAction = contactSlice.actions;
export const getContacts = (token,userId) => {
    return async (dispatch) => {
        let response = await axios.get("https://chatappbackend123456.herokuapp.com/contacts",{
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        });
        console.log(response);
        console.log(response.status);
        if(response.status !== 200 && response.status !== 201){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : response.data.message
                }
            }))
            return;
        }
        console.log(response.data.userData.contacts);
        dispatch(contactAction.addContacts({
            contacts : response.data.userData.contacts
        }));
        let contacts = response.data.userData.contacts;
        if(contacts.length > 0){
            dispatch(chatActions.updateCurrentUserName(contacts[0].contactId.name));
        }
    }
}
export const searchChats = (token,searchVal) => {
    return async (dispatch) => {
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/searchChat",
            {
                searchField : searchVal
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
        dispatch(contactAction.addContacts({
            contacts : res.data.userData.contacts
        }));
        let contacts = res.data.userData.contacts;
        if(contacts.length > 0){
            dispatch(chatActions.updateCurrentUserName(contacts[0].contactId.name));
            dispatch(fetchChats(contacts[0].contactId._id,contacts[0].contactId.name,contacts[0].contactId.email,token));
        }
    }
}
export default contactSlice;
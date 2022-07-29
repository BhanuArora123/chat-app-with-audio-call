import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { chatActions } from "./chat";
import { contactAction } from "./contacts";
import { notiActions } from "./noti";
import connectToSocket, { sendJoinRoomEvent , getSocket } from "../utils/socketConn";
import crypto , {SHA256} from "crypto-js";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        token: "",
        userData: {}
    },
    reducers: {
        login(state, action) {
            state.loggedIn = true;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("userId", action.payload.userId);
        },
        logout(state, action) {
            state.loggedIn = false;
            state.token = "";
            localStorage.removeItem("token");
        },
        getUserData(state, actions) {
            state.userData = actions.payload.userData;
            localStorage.setItem("userData", JSON.stringify({ ...state.userData }));
        }
    }
})
export const authActions = authSlice.actions;
export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(notiActions.changeNoti({
            notiData: {
                type: "info",
                message: "login inprogress!"
            }
        }));
        let res = await fetch("https://chatappbackend123456.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        console.log("hello");
        let data = await res.json();
        console.log(data);
        if (!res.ok) {
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "error",
                    message: data.msg[0].msg
                }
            }));
            return data;
        }
        if (data) {
            dispatch(authActions.login({ token: data.token }));
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "success",
                    message: data.msg
                }
            }));
            // store data to localStorage ;
            // localStorage.setItem("user",JSON.stringify(data));
            return data;
        }
    }
}
export const signup = (email, password, name) => {
    return async (dispatch) => {
        dispatch(notiActions.changeNoti({
            notiData: {
                type: "info",
                message: "Signup inprogress!"
            }
        }));
        let res = await fetch("https://chatappbackend123456.herokuapp.com/signup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name
            })
        });
        console.log("hello");
        let data = await res.json();
        console.log(data);
        if (!res.ok) {
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "error",
                    message: data.msg[0].msg
                }
            }));
            return data;
        }
        if (data) {
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "success",
                    message: data.msg
                }
            }));
            // store data to localStorage ;
            // localStorage.setItem("user",JSON.stringify(data));
            return data;
        }
    }
}
export const getUserData = (token) => {
    return async (dispatch) => {
        let response = await axios.get("https://chatappbackend123456.herokuapp.com/getUserData", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        console.log(response);
        console.log(response.status);
        if (response.status !== 200 && response.status !== 201) {
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "error",
                    message: response.data.message
                }
            }))
            return;
        }
        dispatch(authActions.getUserData({
            userData: response.data.userData
        }));
        let contacts = response.data.userData.contacts;
        dispatch(contactAction.addContacts({
            contacts : contacts
        }))
        // connecting to web sockets
        await connectToSocket();
        // sending join room event; 
        let hashed = SHA256(response.data.userData.email).toString(crypto.enc.Hex);
        console.log(hashed);
        sendJoinRoomEvent(hashed,response.data.userData._id);
        if (contacts.length > 0) {
            let firstChatRes = await axios.post("https://chatappbackend123456.herokuapp.com/displayMessages", {
                currentId: contacts[0].contactId
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });
            console.log(firstChatRes);
            if (firstChatRes.status !== 200 && firstChatRes.status !== 201) {
                dispatch(notiActions.changeNoti({
                    notiData: {
                        type: "error",
                        message: firstChatRes.data.message
                    }
                }))
                return;
            }
            console.log(firstChatRes.data);
            dispatch(chatActions.storeEmailAndChats({
                id: contacts[0].contactId._id,
                chats: firstChatRes.data.chats,
                email : contacts[0].contactId.email
            }));
        }
        
        // recieving personal chats;
        let iocon = getSocket();
        // iocon.on("new_msg",(data) => {
        //     if(contacts[0] && contacts[0].contactId.email === data.sentBy){
        //         console.log(data);
        //         dispatch(chatActions.addChat({...data,chatContent : data.chat}));
        //     }
        // })
    }
}
export const editProfile = (formData,token) => {
    return async (dispatch) => {
        let response = await axios.post("https://chatappbackend123456.herokuapp.com/editUser",formData ,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        console.log(response);
        console.log(response.status);
        if (response.status !== 200 && response.status !== 201) {
            dispatch(notiActions.changeNoti({
                notiData: {
                    type: "error",
                    message: response.data.message
                }
            }))
            return;
        }
        dispatch(getUserData(token));
    }
}
export default authSlice;
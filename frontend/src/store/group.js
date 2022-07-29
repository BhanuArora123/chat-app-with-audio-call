import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notiActions } from "./noti";

const groupSlice = createSlice({
    name : "groups",
    initialState : {
        groupName : undefined,
        groupIcon : undefined,
        groupMembers : undefined,
        groupChats : [],
        groupAdmin:undefined,
        groups:[],
        groupId : undefined
    },
    reducers : {
        updateGroupData(state , actions){
            state.groupName = actions.payload.groupName;
            state.groupIcon = actions.payload.groupIcon;
            state.groupMembers = actions.payload.groupMember;
            state.groupAdmin = actions.payload.groupAdmin;
            state.groupId = actions.payload.groupId;
        },
        getGroupChats(state,actions){
            state.groupChats = actions.payload.groupChats;
        },
        addGroups(state,actions){
            state.groups = actions.payload.groups;
        },
        updateGroupId (state,actions){
            state.groupId = actions.payload.groupId;
        }
    }
});
export const groupActions = groupSlice.actions;
export const fetchGroupChats = (token,groupName,groupAdminId,groupId) => {
    return async (dispatch) => {
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/displayGrpMessages",
            {
                groupName : groupName,
                creatorId : groupAdminId
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
        dispatch(groupActions.updateGroupId({
            groupId:groupId
        }));
        dispatch(groupActions.getGroupChats({
            groupChats : res.data.chats
        }))
    }
}
export const getGroups = (token) => {
    return async (dispatch) => {
        let response = await axios.get("https://chatappbackend123456.herokuapp.com/groups",{
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        });
        console.log(response);
        console.log(response.status);
        console.log(response.data.userData);
        if(response.status !== 200 && response.status !== 201){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : response.data.message
                }
            }))
            return;
        }
        let groups = response.data.userData.groups;
        console.log(groups);
        dispatch(groupActions.addGroups({
            groups:groups?groups : []
        }))
        if(groups.length > 0){
            dispatch(groupActions.updateGroupData({
                groupName : groups[0].groupId.groupName,
                groupIcon : groups[0].groupId.groupIcon,
                groupMembers : groups[0].groupId.members,
                groupAdmin:groups[0].groupId.creatorId,
                groupId : groups[0].groupId._id
            }));
            dispatch(fetchGroupChats(token,groups[0].groupId.groupName,groups[0].groupId.creatorId,groups[0].groupId._id));
        }
    }
}
export const sendGroupMessage = (token,email,msg,groupName,creatorId,groupId) => {
    return async (dispatch) => {
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/sendGrpMessage",{
            groupName,
            creatorId,
            msg,
            email
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
        dispatch(fetchGroupChats(token,groupName,creatorId,groupId));
    }
}
export const addGroup = (formData,token) => {
    return async(dispatch) => {
        let res = await axios.post("https://chatappbackend123456.herokuapp.com/createGroup",formData,{
            headers : {
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        });
        if(res.status !== 201 && res.status !== 200){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : res.data.msg
                }
            }));
            return;
        }
        dispatch(getGroups(token));
    }
}
export default groupSlice;
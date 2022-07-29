import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
    name : "noti",
    initialState : {
        showNoti : false,
        notiData : {}
    },
    reducers : {
        changeNoti(state,action){
            state.showNoti = true;
            state.notiData = action.payload.notiData;
        }
    }
})

export const notiActions = notiSlice.actions;
export default notiSlice;
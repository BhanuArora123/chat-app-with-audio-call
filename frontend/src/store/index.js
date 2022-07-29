import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import chatSlice from "./chat";
import contactSlice from "./contacts";
import groupSlice from "./group";
import notiSlice from "./noti";
const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        noti : notiSlice.reducer,
        chat : chatSlice.reducer,
        contact : contactSlice.reducer,
        group : groupSlice.reducer
    }
});

export default store;
import { Box } from "@mui/material";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import SideBar from "./Sidebar"
import logo from "../../logo.png";
import Profile from "./Profile";
import { Route, Routes , useParams } from "react-router-dom";
import Group from "./Group";
import Contacts from "./Contacts";
import Settings from "./Settings";
import { useEffect } from "react";
import { getUserData } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const DashBoard = props => {
    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth);
    const { component } = useParams();
    useEffect(() => {
        dispatch(getUserData(authData.token));
    },[component]);
    return (
        <Box sx={{
            width : "100%",
            height : "100%",
            display : "flex",
            justifyContent:"flex-start",
            alignItems : "center",
            backgroundColor : "rgb(33,33,33)"
        }}>
            <SideBar></SideBar>
            {/* <ChatList></ChatList> */}
            {/* <Profile></Profile> */}
            {
                (component === "chats" || component === "" ) && <ChatList></ChatList>
            }
            {
                (component === "profile" ) && <Profile></Profile>
            }
            {
                (component === "groups" || component === "" ) && <Group></Group>
            }
            {
                (component === "contacts" || component === "" ) && <Contacts></Contacts>
            }
            {
                (component === "settings" || component === "" ) && <Settings></Settings>
            }
            <ChatBox name="Contact" image={logo}></ChatBox>
        </Box>
    )
}

export default DashBoard;
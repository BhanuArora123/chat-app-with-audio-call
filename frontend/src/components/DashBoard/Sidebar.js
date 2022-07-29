import { MenuItem } from "@mui/material"
import logo from "../../logo.png";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
    active : {
        color : "black",
        backgroundColor : "white",
        "&:hover" : {
            backgroundColor : "white"
        }
    }, 
    activeIcon : {
        color : "black"
    },
})
const SideBar = props => {
    const [section , setSection] = useState("chats");
    const styling = useStyles();
    return (
        <div className={ classes.menu }>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            } }>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} to="/">
                    <img width="30px" height="30px" src={ logo } alt="chitchat"></img>
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:0,
                margin:0
            } } onClick={() => setSection("profile")} className={section === "profile" ? styling.active : ""}>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} to="/dashBoard/profile">
                    <PermIdentityIcon sx={ {
                        width: "30px",
                        height: "30px",
                        color: "white"
                    } } className={section === "profile" ? styling.activeIcon : ""}></PermIdentityIcon>
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:0,
                margin:0
            } } onClick={() => setSection("chats")} className={section === "chats" ? styling.active : ""}>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    padding:0,
                    margin:0
                }} to="/dashBoard/chats">
                    <ChatBubbleIcon sx={ {
                        width: "30px",
                        height: "30px",
                        color : "white"
                    } } className={section === "chats" ? styling.activeIcon : ""}/>
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:0,
                margin:0
            } } onClick={() => setSection("group")} className={section === "group" ? styling.active : ""}>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    padding:0,
                    margin:0
                }} to="/dashBoard/groups">
                <GroupIcon sx={ {
                    width: "30px",
                    height: "30px",
                    color : "white"
                } } className={section === "group" ? styling.activeIcon : ""} />
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:0,
                margin:0
            } } onClick={() => setSection("contacts")} className={section === "contacts" ? styling.active : ""}>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} to="/dashBoard/contacts">
                <ContactsIcon sx={ {
                    width: "30px",
                    height: "30px",
                    color : "white"
                } } className={section === "contacts" ? styling.activeIcon : ""} />
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding:0,
                margin:0
            } } onClick={() => setSection("settings")} className={section === "settings" ? styling.active : ""}>
                <Link style={{
                    width : "100%",
                    height : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} to="/dashBoard/settings">
                <SettingsIcon sx={ {
                    width: "30px",
                    height: "30px",
                    color : "white"
                } } className={section === "settings" ? styling.activeIcon : ""} />
                </Link>
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            } }>
                <LightModeIcon sx={ {
                    width: "30px",
                    height: "30px"
                } } />
            </MenuItem>
            <MenuItem sx={ {
                width: "70px",
                height: "70px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            } }>
                <img width="30px" height="30px" src={ logo } alt="profile icon"></img>
            </MenuItem>
        </div>
    )
}

export default SideBar;
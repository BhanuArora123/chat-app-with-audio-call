import { Typography } from "@material-ui/core"
import { GroupAdd, PersonAdd, Search } from "@mui/icons-material"
import MoreVert from "@mui/icons-material/MoreVert"
import { Box, Button, InputAdornment, TextField } from "@mui/material"
import { InputGroup, FormControl, Form } from "react-bootstrap"
import Chat from "./Chats/Chat"
import Contact from "./Contact/Contact"
import AddBoxIcon from '@mui/icons-material/AddBox';
import "./scrollbarCSS.css";
import { useState } from "react"
import Modal from "./Modals/Modal"
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux"
import { notiActions } from "../../store/noti";
import { contactAction } from "../../store/contacts";
const Contacts = props => {
    // const contacts = [
    //     {
    //         name: "Nikhil Arora"
    //     },
    //     {
    //         name: "Abhishek Vats",
    //     },
    //     {
    //         name: "Jyoti Arora"
    //     }
    // ];
    const auth = useSelector(state => state.auth);
    const [contactEmail , setContactEmail] = useState();
    const [contactName , setContactName] = useState();
    const dispatch = useDispatch();
    const addContactHandler = async () => {
        let contactData = await axios.post("https://chatappbackend123456.herokuapp.com/addContact",{
            name : contactName,
            email : contactEmail
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })
        if(contactData.status !== 200 && contactData.status !== 201){
            dispatch(notiActions.changeNoti({
                notiData : {
                    type : "error",
                    message : contactData.data.message
                }
            }));
        }
        console.log(contactData.data.contacts);
        dispatch(contactAction.addContacts({
            contacts : contactData.data.contacts
        }));
        setOpen(false);
    }
    const contactEmailHandler = (event) => {
        setContactEmail(event.target.value);
    }
    const contactNameHandler = (event) => {
        setContactName(event.target.value);
    }
    const contacts = useSelector(state => state.contact).contacts;
    const [open, setOpen] = useState(false);
    const handleClose = (event) => {
        event.stopPropagation();
        setOpen(false);
    };
    const handleToggle = (event) => {
        event.stopPropagation();
        setOpen(!open);
    };
    return (
        <Box sx={ {
            width: "30%",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            overflow: "scroll"
        } } className="scrollElement">
            <Box sx={ {
                width: "90%",
                height: "10%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "5px"
            } }>
                <Typography variant="h5">Contacts</Typography>
                <AddBoxIcon onClick={ handleToggle } sx={ {
                    width: "30px",
                    height: "30px"
                } } />
            </Box>
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
                    placeholder="Search Contacts"
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
                    } }
                />
            </InputGroup>
            <Box sx={ {
                height: "70%",
                width: "90%"
            } }>
                {
                    contacts.map((group) => {
                        return (
                            <Contact { ...group.contactId } />
                        )
                    })
                }
            </Box>
            <Modal open={ open } handleClose={ handleClose }>
                <Box sx={ {
                    width: "45%",
                    height: "400px",
                    backgroundColor: "white",
                    zIndex : 10000,
                    position : "relative",
                    color : "black",
                    boxSizing : "border-box",
                    display : "flex",
                    justifyContent : "space-around",
                    alignItems : "center",
                    flexDirection : "column",
                    borderRadius : "10px"
                } } onClick={(e)=>{e.stopPropagation()}}>
                    <Box sx={{
                        width : "50%",
                        display : "flex",
                        justifyContent : "space-evenly",
                        alignItems : "center",
                        height : "15%"
                    }}>
                        <PersonAdd sx={{
                            fontSize : "38px"
                        }}></PersonAdd>
                        <Typography variant="h4">Add Contact</Typography>
                    </Box>
                    <Box sx={{
                        width : "100%",
                        height : "80%",
                        display : "flex",
                        flexDirection : "column",
                        justifyContent : "space-around",
                        alignItems : "center"
                    }}>
                        <Box sx={{
                            width : "90%"
                        }}>
                            <TextField id="filled-basic" onChange={contactEmailHandler} autoComplete="new-password" variant="outlined" type="email" placeholder="Email" label="Email" InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonAdd />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} />
                        </Box>
                        <Box sx={{
                            width : "90%"
                        }}>
                            <TextField id="filled-basic" autoComplete="new-password" variant="outlined" type="text" onChange={contactNameHandler} placeholder="Name" label="Name" InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonAdd />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} />
                        </Box>
                        <Box sx={{
                            width : "90%",
                            display : "flex",
                            justifyContent : "flex-start"
                        }}>
                            <Button variant="contained" sx={{
                                height : "45px"
                            }} onClick={addContactHandler}>
                                Add Contact
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
export default Contacts;
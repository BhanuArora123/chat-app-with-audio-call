import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreVert, Person, PersonOutline } from '@mui/icons-material';
import Modal from '../Modals/Modal';
import { Box, Button, TextField, Typography } from '@mui/material';
import { InputAdornment } from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from '../../../store/auth';
import { Link } from 'react-router-dom';

export default function MenuBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openModal, setOpenModal] = React.useState(false);
    const handleCloseModal = (event) => {
        event.stopPropagation();
        setOpenModal(false);
    };
    const handleToggle = (event) => {
        event.stopPropagation();
        setOpenModal(!openModal);
        handleClose();
    };
    const [status , setStatus] = useState();
    const [profilePic , setProfilePic] = useState();
    const [name , setName] = useState();
    const changeFileHandler = (event) => {
      setProfilePic(event.target.files[0]);
    }
    const nameHandler = (event) => {
      setName(event.target.value);
    }
    const statusHandler = (event) => {
      setStatus(event.target.value);
    }
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const editProfileHandler = () => {
      let formData = new FormData();
      formData.append("name",name);
      formData.append("status",status);
      if(profilePic){
        formData.append("image",profilePic);
      }
      dispatch(editProfile(formData,auth.token));
      setOpenModal(false);
    }
    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("userId");
        handleClose();
        window.location.href = "/";
    }
  return (
    <div>
      <MoreVert
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleToggle}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>
            <Link to="/dashBoard/profile" style={{
                color : "black",
                textDecoration : "none"
            }}>
                My account
            </Link>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
      <Modal open={ openModal } handleClose={ handleCloseModal }>
      <Box sx={ {
                    width: "45%",
                    height: "550px",
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
                        <Person sx={{
                            fontSize : "38px"
                        }}/>
                        <Typography variant="h4">Edit Profile</Typography>
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
                            <TextField id="filled-basic" autoComplete="new-password" variant="outlined" type="text" placeholder="Name" label="Name" InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} onChange={nameHandler} />
                        </Box>
                        <Box sx={{
                            width : "90%"
                        }}>
                            <TextField id="filled-basic" autoComplete="new-password" variant="outlined" type="file" placeholder="Profile Pic" label="Profile Pic" InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} onChange={changeFileHandler} />
                        </Box>
                        <Box sx={{
                            width : "90%"
                        }}>
                            <TextField id="filled-basic" autoComplete="new-password" variant="outlined" type="text" placeholder="Status" label="Status" InputProps={ {
                                // autoComplete :"nope",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutline />
                                    </InputAdornment>
                                )
                            } } sx={{
                                width : "100%",
                                height : "30px"
                            }} onChange={statusHandler} />
                        </Box>
                        <Box sx={{
                            width : "90%",
                            display : "flex",
                            justifyContent : "flex-start"
                        }}>
                            <Button variant="contained" onClick={editProfileHandler}  sx={{
                                height : "45px"
                            }}>
                                Edit Profile
                            </Button>
                        </Box>
                    </Box>
                </Box>
      </Modal>
    </div>
  );
}

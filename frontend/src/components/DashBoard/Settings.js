import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Image } from "react-bootstrap";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "../../logo.png";
import MenuBar from "./MenuItem/Menu";
import "./scrollbarCSS.css";
import { useSelector } from "react-redux";
const Settings = props => {
    const auth = useSelector(state => state.auth).userData;
    return (
        <Box sx={{
            width : "30%",
            height : "100%",
            display : "flex",
            justifyContent : "space-around",
            alignItems :"center",
            flexDirection : "column",
            color : "white",
            overflow:"scroll"
        }} className="scrollElement">
            <Box sx={{
                width : "90%",
                height : "15%",
                display : "flex",
                justifyContent : "space-between",
                alignItems : "center"
            }}>
                <Typography variant="h5">Settings</Typography>
                <MenuBar></MenuBar>
            </Box>
            <Box sx={{
                width : "90%",
                display : "flex",
                justifyContent : "space-around",
                alignItems : "center",
                flexDirection : "column",
                height : "30%"
            }}>
                <Avatar style={{
                    borderRadius : "50%",
                    width : "80px",
                    height : "80px"
                }} src={ auth.profilePic } rounded></Avatar>
                <Typography sx={{
                    width : "90%",
                    height : "10%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }}>{auth.name}</Typography>
                <Typography sx={{
                    width : "90%",
                    height : "10%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }}>Active</Typography>
            </Box>
            <Box sx={{
                width : "90%",
                height : "45%"
            }}>
                <Accordion sx={{
                    width : "100%",
                    backgroundColor : "rgb(54,53,52)",
                    color : "white"
                }}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon sx={{
                            color : "white"
                        }}/> }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Personal Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {auth.status}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    width : "100%",
                    backgroundColor : "rgb(54,53,52)",
                    color : "white"
                }}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon sx={{
                            color : "white"
                        }} /> }
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Privacy</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    width : "100%",
                    backgroundColor : "rgb(54,53,52)",
                    color : "white"
                }}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon sx={{
                            color : "white"
                        }} /> }
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Security</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    width : "100%",
                    backgroundColor : "rgb(54,53,52)",
                    color : "white"
                }}>
                    <AccordionSummary
                        expandIcon={ <ExpandMoreIcon sx={{
                            color : "white"
                        }} /> }
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Help</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    )
}
export default Settings;
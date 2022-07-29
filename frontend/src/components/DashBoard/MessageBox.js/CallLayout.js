import { Call, CallEnd, Cancel } from "@mui/icons-material"
import { Box, Typography } from "@mui/material";
import photo from "../../../Images/photo.jpg";
const flexBoxCss = {
    width: "90%",
    height: "90%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column"
}
const callImageCss = {
    width: "40%",
    height: "30%"
}
const CallLayout = props => {
    return (
        <Box sx={ flexBoxCss } >
            <Box sx={ {
                ...flexBoxCss,
                ...callImageCss
            } }>
                <img alt="caller" src={ photo } width="100px" height="100px" style={ {
                    borderRadius: "50%"
                } }></img>
            </Box>
            <Box sx={ {
                ...flexBoxCss,
                ...callImageCss,
                height: "20%"
            } }>
                <Typography variant="h6">{ props.name }</Typography>
                <Typography variant="body1" sx={ {
                    color: "gray"
                } }>{ props.status }</Typography>
            </Box>
            <Box sx={ {
                ...flexBoxCss,
                ...callImageCss,
                height: "20%",
                flexDirection: "row"
            } }>
                <Box sx={ {
                    backgroundColor: "rgb(255, 54, 54)",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%"
                } }>
                    <CallEnd sx={ {
                        width: "25px",
                        height: "25px"
                    } }></CallEnd>
                </Box>
                {
                    props.callingData && <Box sx={ {
                        backgroundColor: "rgb(0, 255, 153)",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%"
                    } }>
                        <Call sx={ {
                            width: "25px",
                            height: "25px"
                        } } onClick={ props.acceptCall }></Call>
                    </Box>
                }
            </Box>
        </Box>
    )
}
export default CallLayout;
import {Backdrop} from "@mui/material";
const Modal = props => {
    return (
        <div style={{
            display : (!(props.open)? "none":"flex")
        }}>
            <Backdrop
                sx={ { 
                    color: '#fff', 
                    zIndex: 100,
                    width : (!(props.open)? "0%":"100%"),
                    height : "100%",
                    position:"absolute"
                } }
                open={ props.open }
                onClick={ props.handleClose }
            >
                {
                    props.children
                }
            </Backdrop>
        </div>
    );
}
export default Modal;
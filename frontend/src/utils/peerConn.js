import Peer from "peerjs";
let peerObj;
const connectToPeer = () => {
    peerObj = new Peer(undefined,{
        path: "/peerjs",
        host: "peerserver-video-app.herokuapp.com",
        secure : true
    });
    return peerObj;
}
export const getPeerConn = () => {
    if(peerObj){
        return peerObj;
    }else{
        return "peer connection failed"
    }
};
export default connectToPeer;
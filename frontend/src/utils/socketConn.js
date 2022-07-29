import { io, Socket } from "socket.io-client";

let getIo;

const connectToSocket = () => {
    return new Promise((resolve, reject) => {
        let socket = io("https://chatappbackend123456.herokuapp.com");
        socket.on("connect", (data) => {
            console.log(data);
            getIo = socket;
            resolve(getIo);
        })
    })
};
export const getSocket = () => {
    if (getIo) {
        return getIo;
    }
    else {
        return undefined;
    }
};
export const sendJoinRoomEvent = (roomId, userId) => {
    if (getIo) {
        getIo.emit("join-room", roomId, userId);
    } else {
        return "Socket is not yet connected";
    }
}
export const emitEvent = (event,data) => {
    if(getIo){
        getIo.emit(event,data);
    }else{
        return "Socket is not yet connected";
    }
}
export default connectToSocket;
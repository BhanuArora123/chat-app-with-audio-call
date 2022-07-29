import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import DashBoard from './components/DashBoard/DashBoard';
import Login from './components/Login';
import { authActions } from './store/auth';

function App() {
  const dispatch = useDispatch();
  const noti = useSelector(state => state.noti);
  const auth = useSelector(state => state.auth);
  if (!(auth.token)) {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authActions.login({ token }));
    }
  }
  return (
    <>
    {
                noti.showNoti && <Alert sx={{
                    width : "100%",
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center"
                }} severity={noti.notiData.type}>{noti.notiData.message}</Alert>
            }
    <div className="App">
      <Routes>
        <Route path="/" element={auth.loggedIn ? <Navigate to="/dashBoard" /> :<Navigate to="/login" /> }>
        </Route>
        <Route path="/login" element={ auth.loggedIn ? <Navigate to="/dashBoard" /> : <Login routeName="Login" /> }>
        </Route>
        <Route path="/signup" element={ auth.loggedIn ? <Navigate to="/dashBoard" /> : <Login routeName="Signup" /> }>
        </Route>
        <Route path="/dashBoard" element={ auth.loggedIn ? <Navigate to="/dashBoard/chats" /> : <Login routeName="Login" /> }>
        </Route>
        <Route path="/dashBoard/:component" element={ <DashBoard></DashBoard> }>
        </Route>
      </Routes>
    </div>
    </>
  );
}

export default App;

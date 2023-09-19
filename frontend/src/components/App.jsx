import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Navbar, Button, Image } from 'react-bootstrap';
import socket from '../socket';

import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';
import SignupPage from './SignupPage';
import { actions as messagesActions } from '../slices/messagesInfo';
import { actions as channelsActions } from '../slices/channelsInfo';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true)
    console.log(localStorage)
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    console.log(localStorage)
    setLoggedIn(false);
  };

  return <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
    {children}
  </AuthContext.Provider>
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const LogoImg = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Image 
      src='../../images/auth_success_logo.jpg'
      style={{ width: '68px' }}
      ></Image>
      : <Image 
      src='../../images/logo.jpg'
      style={{ width: '68px' }}
      ></Image>
  );
};
 
const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  
  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
}

const App = () => {
  socket.connect();
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id}));
    })

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('newMessage');
      socket.off('newChannel');  
    };
  })
  
  return (
    <AuthProvider>
      <Router>
        <div className='d-flex flex-column h-100'>
          <Navbar expand="lg" className='shadow-sm bg-white'>
            <div className="container flex-nowrap">
              <Navbar.Brand>
                Scv
                <LogoImg />
                  rechnik
              </Navbar.Brand>
              <Image 
                src='../../images/bird_1.jpg'
                style={{ height: '46px' }}
              />
              <Image 
                src='../../images/bird_2.jpg'
                style={{ height: '46px' }}
              />
              <Image 
                src='../../images/bird_3.jpg'
                style={{ height: '46px' }}
              />
              <Image 
                src='../../images/bird_4.jpg'
                style={{ height: '46px' }}
              />
              <Image 
                src='../../images/bird_1.jpg'
                style={{ height: '46px' }}
              />
              <Image 
                src='../../images/bird_2.jpg'
                style={{ height: '46px' }}
              />
              <AuthButton />
            </div>
          </Navbar>
          <Routes>
            <Route path='/' element={(
              <ChatRoute>
                <ChatPage />
              </ChatRoute>                
              )} 
            />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
};

export default App;

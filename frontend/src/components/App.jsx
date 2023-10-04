import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
  NavLink, 
  useLocation
} from 'react-router-dom';
import { Navbar, Button, Image } from 'react-bootstrap';
import socket from '../socket';
import { useTranslation } from 'react-i18next';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';
import SignupPage from './SignupPage';
import ErrorPage from './ErrorPage';
import { actions as messagesActions } from '../slices/messagesInfo';
import { actions as channelsActions } from '../slices/channelsInfo';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';


const rollbarConfig = {
  accessToken: '3150ed3210e24b52acb61437a05bedf0',
  environment: 'testenv',
};

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
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('logout')}</Button>
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
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id}));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.renameChannel(channel));
    });
    socket.on('removeChannel', (data) => {
      dispatch(channelsActions.removeChannel(data));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');  
      socket.off('renameChannel');
      socket.off('removeChannel');
    };
  })

  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <div className='d-flex flex-column h-100'>
                <Navbar expand="lg" className='shadow-sm bg-white'>
                  <div className="container flex-nowrap">
                    <NavLink
                      to="/"
                      style={{ textDecoration: 'none', color: 'black'}}
                    >
                      Hexlet Chat
                      <LogoImg />
                    </NavLink>
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
                      src='../../images/bird_2.jpg'
                      style={{ height: '46px' }}
                    />
                    <Image 
                      src='../../images/bird_1.jpg'
                      style={{ height: '46px' }}
                    />
                    <Image 
                      src='../../images/bird_4.jpg'
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
                  <Route path='*' element={<ErrorPage />} /> 
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/signup' element={<SignupPage />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </Provider>
      <ToastContainer />
    </>
  )
};

export default App;

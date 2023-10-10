import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink,
  useLocation,
} from 'react-router-dom';
import { Navbar, Image } from 'react-bootstrap';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import socket from '../socket';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';
import SignupPage from './SignupPage';
import ErrorPage from './ErrorPage';
import { actions as messagesActions } from '../slices/messagesInfo';
import { actions as channelsActions } from '../slices/channelsInfo';

const rollbarConfig = {
  accessToken: '3150ed3210e24b52acb61437a05bedf0',
  environment: 'testenv',
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { t } = useTranslation();
  const logIn = () => {
    const userName = JSON.parse(localStorage.getItem('userId')).username;
    toast(
      `${t('greeting')}, ${userName}!`,
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      },
    );
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    /* eslint-disable-next-line  react/jsx-no-constructed-context-values */
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const LogoImg = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? (
        <Image
          src="../../images/auth_success_logo.jpg"
          style={{ width: '68px' }}
        />
      )
      : (
        <Image
          src="../../images/logo.jpg"
          style={{ width: '68px' }}
        />
      )
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      const date = new Date();
      const time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
      };

      const msg = { ...message, time };
      dispatch(messagesActions.addMessage(msg));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
      dispatch(channelsActions.setCurrentChannelId({ channelId: channel.id }));
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
  });

  return (
    <>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <div className="d-flex flex-column h-100">
                <Navbar
                  expand="lg"
                  className="shadow-sm bg-white"
                  style={{ zIndex: '6' }}
                >
                  <div className="container flex-nowrap">
                    <NavLink
                      to="/"
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      Scvorechnik
                      <LogoImg />
                    </NavLink>
                    <Image
                      src="../../images/bird_1.jpg"
                      style={{ height: '46px' }}
                    />
                    <Image
                      src="../../images/bird_2.jpg"
                      style={{ height: '46px' }}
                    />
                    <Image
                      src="../../images/bird_3.jpg"
                      style={{ height: '46px' }}
                    />
                    <Image
                      src="../../images/bird_2.jpg"
                      style={{ height: '46px' }}
                    />
                    <Image
                      src="../../images/bird_1.jpg"
                      style={{ height: '46px' }}
                    />
                    <Image
                      src="../../images/bird_4.jpg"
                      style={{ height: '46px' }}
                    />
                  </div>
                </Navbar>
                <Routes>
                  <Route
                    path="/"
                    element={(
                      <ChatRoute>
                        <ChatPage />
                      </ChatRoute>
                    )}
                  />
                  <Route path="*" element={<ErrorPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;

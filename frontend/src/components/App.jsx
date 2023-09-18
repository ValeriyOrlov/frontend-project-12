import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';
import { Navbar, Button, Image } from 'react-bootstrap';

import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';
import SignupPage from './SignupPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
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
      style={{ width: '78px' }}
      ></Image>
      : <Image 
      src='../../images/logo.jpg'
      style={{ width: '58px' }}
      ></Image>
  );
};
 
const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  
  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
}

const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <div className='d-flex flex-column h-100'>
          <Navbar expand="lg" className='shadow-sm bg-white'>
            <div className="container">
              <Navbar.Brand>
                <LogoImg />
                  Scvorechnik
              </Navbar.Brand>
              <Image 
                src='../../images/birds_on_navbar.jpg'
                style={{ height: '64px' }}
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

import React, { useState } from 'react';
import { BrowserRouter as Router, 
  Route, 
  Routes,
  Navigate,
  useLocation
} from 'react-router-dom';

import { Navbar } from 'react-bootstrap';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import AuthContext from '../contexts';
import useAuth from '../hooks';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    setLoggedIn(false);
  };

  return <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
    {children}
  </AuthContext.Provider>
}

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  
  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navbar expand="lg" className='shadow-sm bg-white'>
            <div className="container">
              <Navbar.Brand>Scvorechnik</Navbar.Brand>  
            </div>
          </Navbar>
          <div className='container-fluid h-100'>
            <div className='row justify-content-center align-content-center h-100'>
              <div className='col-12 col-md-8 col-xxl-6'>
              <Routes>
                <Route path='/' element={(
                  <ChatRoute>
                    <ChatPage />
                  </ChatRoute>                
                )} 
              />
                <Route path='/login' element={<LoginPage />} />
              </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
};

export default App;

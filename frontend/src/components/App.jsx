import { Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';

const App = () => {
  return (
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
              <Route path='/' element={null} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
};

export default App;

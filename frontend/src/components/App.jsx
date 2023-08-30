import { Navbar } from 'react-bootstrap';

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" className='shadow-sm bg-white'>
        <div className="container">
          <Navbar.Brand>Sidim - Buhtim</Navbar.Brand>  
        </div>
      </Navbar> 
    </div>
  )
};

export default App;

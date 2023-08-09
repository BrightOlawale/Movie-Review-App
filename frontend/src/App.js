import logo from './logo.svg';
import './App.css';
import AddReview from './components/add-review';
import Movie from './components/movie';
import MovieList from './components/movie-list';
import Login from './components/login';

// Importiong nav and navbar from React Bootstrap
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Importing Switch, Route and Link from React Router
import { Switch, Route, Link } from 'react-router-dom';



function App() {
  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
          <Nav.Link>
            <Link to={"/movies"}>Movies</Link>
          </Nav.Link>
          <Nav.Link>
            {/*  If user is logged in, show logout button, else show login button  */}
            {user ? (<a>Logout User</a>): (<Link to={"/login"}>Login</Link>)
            }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default App;

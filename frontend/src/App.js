// import logo from './logo.svg';
import React from 'react';
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
  const [user, setUser] = React.useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  return (
    <div className='App'>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
          <Nav.Link>
            <Link to={"/movies"}>Movies</Link>
          </Nav.Link>
          <Nav.Link>
            {/*  If user is logged in, show logout button, else show login button  */}
            {user ? (<a onClick={logout}>Logout User</a>): (<Link to={"/login"}>Login</Link>)
            }
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/movies"]} component={MovieList} />
        <Route path="/movies/:id/review" render={(props) => (<AddReview {...props} user={user} />)} />
        <Route path="/movies/:id" render={(props) => (<Movie {...props} user={user} />)} />
        <Route path="/login" render={(props) => (<Login {...props} login={login} />)} />
      </Switch>
    </div>
  );
}

export default App;

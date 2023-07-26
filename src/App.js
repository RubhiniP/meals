import './App.css';
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './Components/Homepage';
import SearchBar1 from './Components/SearchBar1';
import Display from './Components/Display';
import About from './Components/About';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="menu">
          <Link to="/" className="restaurant-name">THE PARADISE INN</Link>
          <ul>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
            </li>
            <li>
              <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>About</Link>
            </li>
            <li>
              <Link to="/search" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Search</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/"><HomePage /></Route>
          <Route exact path="/search"><SearchBar1 /></Route>
          <Route exact path="/about"><About /></Route>
          <Route exact path="/display/:id"><Display /></Route>
        </Switch>

        {/* Footer */}
        <footer className="footer" style={{backgroundColor: '#121212', color: 'white', padding:'10px', textAlign: 'center'}}>
          <p>&copy; {new Date().getFullYear()} THE PARADISE INN. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;

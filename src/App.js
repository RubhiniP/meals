import './App.css';
import React, { Component } from 'react';
import { Suspense } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Loading from './Components/Loading';
// import Display from './Components/Display';
// import About from './Components/About';
// import Notfound from './Components/Notfound';

const About = React.lazy(() => import("./Components/About"));
const Display = React.lazy(() => import("./Components/Display"));
const Notfound = React.lazy(() => import("./Components/Notfound"));

class App extends Component {

  constructor(props){
    super(props);
    this.scrollButtonRef = React.createRef();
  }

  scrollToSection = () => {
    this.scrollButtonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  render() {
    return (
      <div className="App">
        <nav className="menu" style={{ position: 'sticky', top: 0, margin: 0}}>
          <Link to="/" className="restaurant-name">THE PARADISE INN</Link>
          <ul>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
            </li>
            <li onClick={this.scrollToSection} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Search</li>
          </ul>
        </nav>
        <Suspense fallback={<div><Loading /></div>}>
          <Switch>
            <Route exact path="/"><About scrollButtonRef={this.scrollButtonRef}/></Route>
            <Route exact path="/display/:id"><Display /></Route>
            <Route path='*' component={Notfound}></Route>
          </Switch>
        </Suspense>

        {/* Footer */}
        <footer className="footer" style={{backgroundColor: '#121212', color: 'white', padding:'10px', textAlign: 'center'}}>
          <p>&copy; {new Date().getFullYear()} THE PARADISE INN. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;

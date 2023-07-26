import React, { Component } from 'react';
import SearchBar1 from './SearchBar1';
import ErrorBoundary from './ErrorBoundary';
import './Homepage.css';

class HomePage extends Component {

  render() {

    return (
      <div>
        <br />
        <div className="wrapper">
          <div className="sliding-background"></div>
          <h2><em style={{color: 'orangered'}}>Laughter</em> is brightest in the place where <em style={{color: 'orangered'}}>Food</em> is good</h2>
        </div>
        <ErrorBoundary>
          <SearchBar1 />
        </ErrorBoundary>
        <br />
      </div>
    );
  }
}

export default HomePage;

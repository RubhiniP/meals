import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div style={{fontSize: '20px', fontVariant: 'all-petite-caps', textAlign: 'center', color: 'red'}}>Oops! Something went wrong!</div>
          <br />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

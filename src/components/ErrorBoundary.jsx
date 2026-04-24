import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Calculator Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg text-black dark:text-white">
          <h2 className="text-2xl font-bold mb-2">Oops, something went wrong.</h2>
          <p className="text-gray-500 mb-6">A calculation or rendering error occurred.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-white font-medium rounded-2xl shadow-md hover:bg-opacity-90 transition"
          >
            Restart Calculator
          </button>
        </div>
      );
    }
    return this.props.children; 
  }
}

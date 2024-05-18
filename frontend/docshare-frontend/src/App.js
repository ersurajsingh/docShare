import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css'; 

function Navbar() {
  return (
    <nav className="navbar"> 
      <div className="container">
        <Link to="/" className="navbar-brand">DocShare</Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="#features" className="navbar-item">Features</Link>
          <Link to="#contact" className="navbar-item">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const [errorMessage, setErrorMessage] = useState(''); // Added for error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', { originalUrl });
      setShortenedUrl(response.data.shortUrl);
      setStats(response.data); // Assuming the response includes initial stats
    } catch (error) {
      setErrorMessage('Error shortening URL. Please try again.');
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="title">DocShare</h1>
                <h2 className="subtitle">Simplify Your Document Sharing</h2>

                <form onSubmit={handleSubmit} className="shorten-form">
                  <input
                    type="text"
                    placeholder="Paste your long URL here"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                  />
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten'}
                  </button>

                  {errorMessage && <p className="error-message">{errorMessage}</p>}

                  {shortenedUrl && (
                    <>
                      <div className="result-container">
                        <h3 className="result-title">Shortened URL</h3>
                        <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="shortened-link">
                          {shortenedUrl}
                        </a>
                      </div>

                      {stats && (
                        <div className="link-stats">
                          <p>Clicks: {stats.clicks}</p>
                          {/* Display other stats */}
                        </div>
                      )}
                    </>
                  )}
                </form>
              </>
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { shortenUrl } from '../api';
const baseURL = process.env.REACT_APP_API_URL;
const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    
    if (!longUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const response = await shortenUrl(longUrl);
      setShortUrl(`${baseURL}/${response.data.shortID}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Shorten Your URL</h2>
              
              <form onSubmit={handleShorten}>
                <div className="mb-3">
                  <label htmlFor="longUrl" className="form-label">Enter Long URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="longUrl"
                    placeholder="https://example.com/very-long-url"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Shortening...' : 'Shorten'}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {shortUrl && (
                <div className="mt-4">
                  <div className="alert alert-success" role="alert">
                    <strong>Success!</strong> Your shortened URL:
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={shortUrl}
                      readOnly
                    />
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
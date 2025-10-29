import React, { useState } from 'react';
import { getAnalytics } from '../api';

const AnalyticsPage = () => {
  const [shortId, setShortId] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAnalytics = async (e) => {
    e.preventDefault();
    setError('');
    setAnalytics(null);

    if (!shortId.trim()) {
      setError('Please enter a short ID');
      return;
    }

    setLoading(true);
    try {
      const response = await getAnalytics(shortId);
      setAnalytics(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">URL Analytics</h2>
              
              <form onSubmit={handleGetAnalytics}>
                <div className="mb-3">
                  <label htmlFor="shortId" className="form-label">Enter Short ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="shortId"
                    placeholder="abc123"
                    value={shortId}
                    onChange={(e) => setShortId(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Enter the short ID (the part after the last /)
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Fetching...' : 'Get Analytics'}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {analytics && (
                <div className="mt-4">
                  <div className="alert alert-info">
                    <strong>Total Clicks:</strong> {analytics.clicks}
                  </div>

                  {analytics.clickTimestamps && analytics.clickTimestamps.length > 0 ? (
                    <div>
                      <h5 className="mb-3">Click History</h5>
                      <div className="list-group">
                        {analytics.clickTimestamps.map((timestamp, index) => (
                          <div key={index} className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                              <span className="mb-1">Click #{index + 1}</span>
                              <small>{new Date(timestamp).toLocaleString()}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted">No clicks recorded yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
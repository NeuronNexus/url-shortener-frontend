import axios from "axios";

const API_BASE = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

export const shortenUrl = async (longUrl) => 
  API_BASE.post(`/`, { url: longUrl }); 

export const getAnalytics = async (shortId) => 
  API_BASE.get(`/analytics/${shortId}`); 
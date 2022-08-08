import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const localInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

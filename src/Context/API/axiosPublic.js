import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3500/',
});

export default axiosPublic;

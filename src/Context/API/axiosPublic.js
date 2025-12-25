import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://app.parvejhusentalukder.com',
});

export default axiosPublic;

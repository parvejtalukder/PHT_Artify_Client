import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://artify.parvejhusentalukder.com',
});

export default axiosPublic;

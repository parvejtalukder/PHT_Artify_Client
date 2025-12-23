import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://artifyserverside.vercel.app/',
});

export default axiosPublic;

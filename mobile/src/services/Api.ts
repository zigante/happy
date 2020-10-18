import Axios from 'axios';

const Api = Axios.create({ baseURL: 'http://192.168.15.130:8080/' });

export default Api;

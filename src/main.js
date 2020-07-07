// import './index.css';
import './index.scss';
import * as api from './util/axios.js';

let data = new URLSearchParams();
data.append("managerAccount",'admin');
data.append("managerPwd",'123456');
api.login(data);

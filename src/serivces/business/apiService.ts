import axios from 'axios';
import { API_ENDPOINTS_USER } from '../../constants/apiEndpoints';

const REACT_APP_API = 'https://e8eb-78-61-24-56.ngrok-free.app/api';

const login = (loginInfo: { email: string; password: string }) =>
  axios.post(`${REACT_APP_API}${API_ENDPOINTS_USER.LOGIN}`, loginInfo);

const fetchUserInfo = (headers: Record<string, string>) =>
  axios.get(`${REACT_APP_API}${API_ENDPOINTS_USER.GET_ME}`, {
    headers: headers,
  });

export const apiService = {
  login,
  fetchUserInfo,
};

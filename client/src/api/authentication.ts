import axios, { AxiosResponse } from 'axios';

const routePrefix = '/authentication';
type ApiResponse = {
  success: boolean;
  error?: any;
};

export const getIsLoggedIn = async (): Promise<boolean> => {
  const response: AxiosResponse<{ isLoggedIn: boolean }> = await axios.get(routePrefix + '/isLoggedIn');
  return response.data.isLoggedIn;
};

export const login = async (params: { username: string; password: string }): Promise<boolean> => {
  const response: AxiosResponse<ApiResponse> = await axios.post(routePrefix + '/login', params);
  return response.data.success;
};

export const logout = async (): Promise<boolean> => {
  const response: AxiosResponse<ApiResponse> = await axios.post(routePrefix + '/logout');
  return response.data.success;
};

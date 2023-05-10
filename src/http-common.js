import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: " https://user-account-management.up.railway.app/api/v1/",
});

const requestHandler = (request) => {
  request.headers.Authorization = `Bearer ${localStorage.token}`;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
  }
  return response;
};

const errorHandler = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("token");
  }
  return Promise.reject(error);
};

http.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default http;

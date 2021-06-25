import Axios from "axios";

const api = Axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://vuttr-domingues.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export default api;

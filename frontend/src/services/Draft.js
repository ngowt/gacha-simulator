import axios from "axios";

export const Draft = axios.create({
  baseURL: "http://localhost:3001/api/"
});

import axios from "axios";

// quando quiser rodar a api : json-server --watch db.json
export const api = axios.create({
  baseURL: "https://back-zbkf-caioalmeida09.vercel.app/",
});

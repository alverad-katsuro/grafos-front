import axios, { Axios } from "axios";  

export const api = axios.create({
  baseURL: "http://localhost:8080/"
});


export default class GrafoApi{
  api: Axios;
  
  constructor() {
    this.api = axios.create({baseURL: "http://localhost:8080/"})
  }

}
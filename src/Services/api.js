import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const getPortfolio = () => API.get("/portfolio");
export const searchCryptos = (query) => API.get(`/search?q=${query}`);
export const getHistorical = (symbol, start, end) => 
    API.get(`/historical/${symbol}?start=${start}&end=${end}`);
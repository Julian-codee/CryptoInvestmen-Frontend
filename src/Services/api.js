import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const getMarket = () => API.get("/market");
export const getPortfolio = () => API.get("/portfolio");

export const toggleCrypto = (coin) =>
    API.post("/toggle-crypto", {
        symbol: coin.symbol,
        name: coin.name,
        cmc_id: coin.id,
    });



export const getHistorical = (symbol, start, end) =>
    API.get(`/historical/${symbol}?start=${start}&end=${end}`);

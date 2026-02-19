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

export const getCurrentPrice = async (symbol) => {
    const res = await API.get('/market');
    const coin = res.data.find(c => c.symbol === symbol);
    return coin ? coin.quote.USD.price : null;
};


export const getHistorical = (symbol, start, end) =>
    API.get(`/historical/${symbol}?start=${start}&end=${end}`);

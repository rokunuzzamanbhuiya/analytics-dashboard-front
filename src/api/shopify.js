import axios from "axios";

const API = "http://localhost:3001/api";

export const getOrders = () => axios.get(`${API}/orders`);
export const getProducts = () => axios.get(`${API}/products`);
export const getCustomers = () => axios.get(`${API}/customers`);

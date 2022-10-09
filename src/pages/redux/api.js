import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});


export const userRegister = (formValue) => API.post("/api/users/userRegister",formValue);
export const userLogin = (formValue) => API.post("/api/users/userLogin",formValue);


export const newOrder = (finalOrder) => API.post("/api/orders/newOrder",finalOrder);
export const getAllOrders = (formValue) => API.post("/api/orders/getAllOrders",formValue);
export const deleteAnOrder = (formValue) => API.post("/api/orders/deleteAnOrder",formValue);
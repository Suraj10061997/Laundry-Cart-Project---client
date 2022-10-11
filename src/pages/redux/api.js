import axios from "axios";

//  https://laundrycartnew.herokuapp.com/
// const API = axios.create({baseURL:"http://localhost:5000"});
const API = axios.create({baseURL:" https://laundrycartnew.herokuapp.com"});


export const userRegister = (formValue) => API.post("/api/users/userRegister",formValue);
export const userLogin = (formValue) => API.post("/api/users/userLogin",formValue);


export const newOrder = (finalOrder) => API.post("/api/orders/newOrder",finalOrder);
export const getAllOrders = (formValue) => API.post("/api/orders/getAllOrders",formValue);
export const deleteAnOrder = (formValue) => API.post("/api/orders/deleteAnOrder",formValue);
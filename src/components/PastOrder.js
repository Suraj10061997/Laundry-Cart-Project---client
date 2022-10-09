import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { getAllOrders, handleViewOrder, deleteAnOrder, handleDeleteAnOrder } from '../pages/redux/features/orderSlice';
import { toggleConfirmCard } from '../pages/redux/features/userSlice';
import "./PastOrder.css";
const PastOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isToggle } = useSelector(state => ({ ...state.auth }));
    const { orders } = useSelector(state => ({ ...state.order }));
    const [filteredOrder, setFilteredOrder] = useState([]);
    const user = JSON.parse(localStorage.getItem("profile"));
    useEffect(() => {
        if (user) {
            const formValue = {
                userId: user.result._id
            }

            dispatch(getAllOrders(formValue));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleViewClick = (orderId) => {
        const container = orders.filter((order) => order._id === orderId);
        setFilteredOrder(container[0].items);
        dispatch(toggleConfirmCard());
        dispatch(handleViewOrder(container[0]));
    }

    const handleDeleteOrder = (orderId) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this order?"
        )
        if (confirmBox === true) {
            const formValue = { orderId: orderId };
            dispatch(handleDeleteAnOrder(orderId));
            dispatch(deleteAnOrder(formValue));
        }
    }

    if (orders.length === 0) return (
        <div>
            <button onClick={() => navigate("/takeorders")} className="create-btn---2">create</button>
        </div>
    )
    return (
        <>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Date & Time</th>
                            <th>Store Location</th>
                            <th>City</th>
                            <th>Store Phone</th>
                            <th>Total Items</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Events</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length && orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{order.orderId}</td>
                                    <td>{`${order.orderDate} ${order.orderTime}`}</td>
                                    <td>{order.storeLocation}</td>
                                    <td>{order.storeCity}</td>
                                    <td>{order.storePhone}</td>
                                    <td>{order.totalQuantity}</td>
                                    <td>{order.totalPrice + order.pickupCharges}</td>
                                    <td>{order.orderStatus === "active" ? "Ready to Pick" : "Cancelled"}</td>
                                    <td><h4 className='cancel-text' onClick={() => handleDeleteOrder(order._id)}>Cancel order</h4></td>
                                    <td className='td--quantity'><img src="./images/eye.svg" alt="view" className='view-text' onClick={() => handleViewClick(order._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {isToggle ? (<Popup order={filteredOrder} />) : null}
        </>
    )
}

export default PastOrder
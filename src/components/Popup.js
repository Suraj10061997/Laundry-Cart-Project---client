import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleConfirmCard } from '../pages/redux/features/userSlice';
import { OpenPopupMsg, newOrder } from '../pages/redux/features/orderSlice';
import moment from "moment";
import "./Popup.css";


const Popup = ({ order }) => {
    console.log("yes");
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const { viewOrder, confirmBtn } = useSelector(state => ({ ...state.order }));
    let subTotal = 0;
    let subTotalQuantity = 0;
    let pickupCharges = 90;
    let m = new Map();
    m.set(0, "Washing");
    m.set(1, "Ironing");
    m.set(2, "Dry Clean");
    m.set(3, "Bleach");
    const container = [];
    for (let i = 0; i < order.length; i++) {
        let item = order[i];
        if (item.totalPrice > 0 && item.totalQuantity > 0) {
            subTotal += item.totalPrice;
            subTotalQuantity += item.totalQuantity;
            container.push(item);
        }
    }


    console.log("container", container);

    const storesLocation = [
        {
            name: "JP nagar",
            address: "Near phone booth, 10th Road",
            phone: "+91 9786543210",
            city: "Bangalore"
        },
        {
            name: "Kanpur",
            address: "Yashoda Nagar, Bypass",
            phone: "+91 98374678234",
            city: "Kanpur"
        }
    ]
    const [storeLocationValue, setStoreLocationValue] = useState("");
    const handleStoreChange = (e) => {
        storesLocation.forEach((store, index) => {
            if (e.target.value === `${index}`) {
                setStoreLocationValue(store);
            }
        })
    }

    const handleCloseBtn = () => {
        dispatch(toggleConfirmCard());
    }
    const confirmHandler = () => {
        if (storeLocationValue === "") {
            return alert("Please select a store's location");
        }
        const finalOrder = {
            items: [...container],
            userId: user.result._id,
            storeLocation: storeLocationValue.name,
            storeCity: storeLocationValue.city,
            storePhone: storeLocationValue.phone,
            totalPrice: subTotal,
            totalQuantity: subTotalQuantity,
            pickupCharges: pickupCharges,
            orderDate: moment().format("YYYY-MM-DD"),
            orderTime: moment().format("HH:mm:ss"),
            orderStatus: "active",
        }
        dispatch(newOrder({ finalOrder, toast }));
        dispatch(toggleConfirmCard());
        dispatch(OpenPopupMsg());
    }
    return (
        <div className='my-modal'>
            <div className='modal-content'>
                {viewOrder === null ? (
                    <>
                        <div className='summary'>
                            <div><h1 className='summary-text'>Summary</h1></div>
                            <div><h1 onClick={handleCloseBtn} className='summary-cross-btn'>X</h1></div>
                        </div>
                        <div className='store-location'>
                            <div>
                                <select className='store-dropdown' onChange={handleStoreChange}>
                                    <option className="store-default-value" disabled selected value="">Store's Location</option>
                                    {storesLocation.map((store, index) => {
                                        return (
                                            <option key={index} value={`${index}`}>{store.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div>
                                <h4>Store Address:</h4>
                                <p>{storeLocationValue.address}</p>
                            </div>
                            <div>
                                <h4>Phone:</h4>
                                <p>{storeLocationValue.phone}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='summary'>
                            <div><h1 className='summary-text'>Summary</h1></div>
                            <div><h1 onClick={handleCloseBtn} className='summary-cross-btn'>X</h1></div>
                        </div>
                        <div className='store-location'>
                            <div>
                                <h4>Store Location:</h4>
                                <p>{viewOrder.storeLocation}</p>
                            </div>
                            <div>
                                <h4>Store Address:</h4>
                                <p>{viewOrder.storeCity}</p>
                            </div>
                            <div>
                                <h4>Phone:</h4>
                                <p>{viewOrder.storePhone}</p>
                            </div>
                        </div>
                    </>
                )}

                <div className='order-details'>
                    <div className='child1'>Order Details</div>
                    <div className='child2'>
                        <div>
                            {container.length && container.map((item, index1) => {
                                let washingContainer = item.washingTypes.filter((type1) => type1 === 1);
                                let count = 0;
                                if (washingContainer.length === 1) {
                                    return (
                                        <div className='child3' key={index1}>
                                            <span className='child3-1'>{item.type}</span>
                                            <span className='child3-2'>
                                                {item.washingTypes.map((type2, index2) => {
                                                    if (type2 === 1) {
                                                        return <span key={index2}>{`${m.get(index2)}`}</span>
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </span>
                                            <span className='child3-3'>
                                                {`${item.totalQuantity}x${item.individualPriceSummation} = ${item.totalPrice}`}
                                            </span>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className='child3' key={index1}>
                                            <span className='child3-1'>{item.type}</span>
                                            <span className='child3-2'>
                                                {item.washingTypes.map((type2, index2) => {
                                                    if (type2 === 1) {
                                                        count=count+1;
                                                        if(count === 1){
                                                            count = count + 1;
                                                            return <span key={index2}>{`${m.get(index2)}`}</span>
                                                        }
                                                        else{
                                                            return <span key={index2}>{` , ${m.get(index2)}`}</span>
                                                        } 
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </span>
                                            <span className='child3-3'>
                                                {`${item.totalQuantity}x${item.individualPriceSummation} = ${item.totalPrice}`}
                                            </span>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <div className='child4'>
                        Sub Total: {subTotal}
                    </div>
                    <div className='child5'>
                        Pickup Charges: {pickupCharges}
                    </div>
                    <div className='child6'>
                        {`Total: Rs ${subTotal + pickupCharges}`}
                    </div>
                </div>
                <div className='address-details-text'>address</div>
                <div className='address-details-container'>
                    <h3 className='home-text'>Home</h3>
                    {
                        JSON.parse(localStorage.getItem("profile")) ? (
                            <p>{JSON.parse(localStorage.getItem("profile")).result.address}</p>
                        ) : (
                            null
                        )
                    }
                </div>
                <div className='confirm-btn-container'>
                    {confirmBtn ? (<button onClick={confirmHandler}>confirm</button>) : (null)}
                </div>
            </div>
        </div>
    )
}

export default Popup
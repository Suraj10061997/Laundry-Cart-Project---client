import React, { useState } from 'react';
import { shop } from '../components/shop';
import "./TakeOrders.css";
import Popup from '../components/Popup';
import { toggleConfirmCard,handleAuthPage } from './redux/features/userSlice';
import { toggleConfirmBtn } from './redux/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeftNavBar from '../components/LeftNavBar';
import ConfirmCard from '../components/confirmCard';
import Footer from "../components/Footer";

const TakeOrders = () => {
    const dispatch = useDispatch();
    const { isToggle } = useSelector(state => ({ ...state.auth }));
    const { openPopupMsg } = useSelector(state => ({ ...state.order }));
    dispatch(handleAuthPage(false))
    dispatch(toggleConfirmBtn(true));
    const [order, setOrder] = useState(shop);

    const handleConfirmCard = () => {
        let flag=1;
        for(let i=0;i<order.length;i++){
            let item = order[i];
            if (item.totalPrice > 0 && item.totalQuantity > 0) {
               flag=1;
               break;
            }else{
                flag=0;
            }
        }
        if(flag === 1){
            dispatch(toggleConfirmCard());
        }else{
            return alert("Kindly place an order");
        }
        
    }
    const activateWashingType = (id, pos) => {
        const newStore = [...order];
        console.log(id, pos);
        newStore.forEach((item) => {
            if (item.pid === id) {
                if (item.washingTypes[pos] === 1) {
                    item.washingTypes[pos] = 0;
                    item.individualPriceSummation -= item.washingTypesPrices[pos];
                    item.totalPrice = item.totalQuantity * item.individualPriceSummation;
                } else {
                    item.washingTypes[pos] = 1;
                    item.individualPriceSummation += item.washingTypesPrices[pos];
                    item.totalPrice = item.totalQuantity * item.individualPriceSummation;
                }
            }
        })
        setOrder(newStore);
    }

    const calculateIndividualProductPrice = (e, id) => {
        const newStore = [...order];
        newStore.forEach(item => {
            if (item.pid === id) {
                item.totalQuantity = Number(e.target.value);
                let sum = 0;
                item.washingTypes.forEach((type, index) => {
                    if (type === 1) {
                        sum += item.washingTypesPrices[index];
                    }
                })
                console.log("sum", sum);
                item.totalPrice = sum * Number(e.target.value);
            }
        })
        setOrder(newStore);
    }
    const user = JSON.parse(localStorage.getItem("profile"));
    if(!user) return window.location.href="/";
    return (
        <>
        <div className='parent-1-container-3'>
            <div>
                <LeftNavBar />
            </div>
            <div className='parent-2-container-3'>
                <div className="create-order--text"><h4>Create Order</h4></div>
                <div>
                    <table>
                        <thead>
                            <tr style={{backgroundColor:"black",color:"white"}}>
                                <th>Product Type</th>
                                <th>Quantity</th>
                                <th>Wash Type</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shop.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <div className="product-type-container">
                                                <div><h4 style={{paddingLeft:"0.6rem"}}>{item.type}</h4></div>
                                                <div className='product-types'><img src={item.image} alt="" /></div>
                                            </div>
                                        </td>
                                        <td><div className='quantity'><input type="number" value={item.totalQuantity} style={{borderStyle:"none"}} onChange={(e) => calculateIndividualProductPrice(e, item.pid)} /></div></td>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <div className="washing-type" onClick={() => activateWashingType(item.pid, 0)}>
                                                    {item.washingTypes[0] === 1 ? (<img src="/images/washing-machineS.svg" alt="" />) : (<img src="/images/washing-machine.svg" alt="" />)}
                                                </div>
                                                <div className="washing-type" onClick={() => activateWashingType(item.pid, 1)}>
                                                    {item.washingTypes[1] === 1 ? (<img src="/images/ironingS.svg" alt="" />) : (<img src="/images/ironing.svg" alt="" />)}
                                                </div>
                                                <div className="washing-type" onClick={() => activateWashingType(item.pid, 2)}>
                                                    {item.washingTypes[2] === 1 ? (<img src="/images/towelS.svg" alt="" />) : (<img src="/images/towel.svg" alt="" />)}
                                                </div>
                                                <div className="washing-type" onClick={() => activateWashingType(item.pid, 3)}>
                                                    {item.washingTypes[3] === 1 ? (<img src="/images/bleachS.svg" alt="" />) : (<img src="/images/bleach.svg" alt="" />)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='td--quantity'>
                                            {item.totalQuantity > 0 && <p>{`${item.totalQuantity}x${item.individualPriceSummation} = ${item.totalPrice}`}</p>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                <button onClick={handleConfirmCard} className="proceed-btn">Proceeds</button>
            {isToggle ? (<Popup order={order} />) : null}
                </div>
            </div>
        </div>
        {openPopupMsg && <ConfirmCard/>}
        <Footer/>
        </>
    )
}

export default TakeOrders
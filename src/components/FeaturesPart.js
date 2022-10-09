import React, { useState } from 'react';
import "./FeaturesPart.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilteredBySearch, handleFilteredByDates, handleFilteredByPrice, handleFilteredByTotalItems } from '../pages/redux/features/orderSlice';

const FeaturesPart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState("");
    const [date, setDate] = useState("all");
    const [price, setPrice] = useState("");
    const [items, setItems] = useState("");
    const { orders, filteredByDate, filteredBySearch } = useSelector(state => ({ ...state.order }));
    const allDatesContainer = [];
    filteredByDate.forEach((order) => {
        if (allDatesContainer.includes(order.orderDate)) {
            return;
        }
        allDatesContainer.push(order.orderDate);
    })

    const handleCreateOrderBtn = () => {
        navigate("/takeorders");
    }
    const handleSearchOrder = (e) => {
        e.preventDefault();
        if (searchKey !== "") {
            const container = filteredBySearch.filter((order) => order.orderId.trim().toLowerCase() === searchKey.trim().toLowerCase());
            dispatch(handleFilteredBySearch(container));
        } else {
            const container = filteredBySearch;
            dispatch(handleFilteredBySearch(container));
        }
    }

    const FilteredByDates = (e) => {
        console.log("date", typeof (e.target.value));
        setDate(e.target.value);
        if (e.target.value !== "all") {
            const container = filteredByDate.filter((order) => order.orderDate === e.target.value);
            dispatch(handleFilteredByDates(container));
        }
        else {
            const container = filteredByDate;
            dispatch(handleFilteredByDates(container));
        }

    }

    const FilterByPrice = (e) => {
        setPrice(e.target.value);
        if (e.target.value === "hightolow") {
            const container = [...orders];
            container.sort((a, b) => {
                const value1 = a.totalPrice;
                const value2 = b.totalPrice;
                if (value1 < value2) return 1;
                if (value1 > value2) return -1;
                return 0;
            })
            dispatch(handleFilteredByPrice(container));
            // console.log("ans",ans);
        } else if (e.target.value === "lowtohigh") {
            const container = [...orders];
            container.sort((a, b) => {
                const value1 = a.totalPrice;
                const value2 = b.totalPrice;
                if (value1 < value2) return -1;
                if (value1 > value2) return 1;
                return 0;
            })
            dispatch(handleFilteredByPrice(container));
            // console.log("ans",ans);
        }
    }

    const FilterByTotalItems = (e) => {
        setItems(e.target.value);
        if (e.target.value === "hightolow") {
            const container = [...orders];
            container.sort((a, b) => {
                const value1 = a.totalQuantity;
                const value2 = b.totalQuantity;
                if (value1 < value2) return 1;
                if (value1 > value2) return -1;
                return 0;
            })
            dispatch(handleFilteredByTotalItems(container));
            // console.log("ans",ans);
        } else if (e.target.value === "lowtohigh") {
            const container = [...orders];
            container.sort((a, b) => {
                const value1 = a.totalQuantity;
                const value2 = b.totalQuantity;
                if (value1 < value2) return -1;
                if (value1 > value2) return 1;
                return 0;
            })
            dispatch(handleFilteredByTotalItems(container));
            // console.log("ans",ans);
        }
    }
    return (
        <div class="main-container-2">
            <div>
                {orders.length ? (
                    <button className="create-btn--2" onClick={handleCreateOrderBtn}>
                        Create
                    </button>
                ):(
                    null
                )}
                <input
                    type="text"
                    placeholder="search by orderId"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}

                />
                <img src="/images/search.svg" alt="search" className='search-btn' type="submit" onClick={handleSearchOrder} />
            </div>
            <div>
                <h5>Filter By Dates:</h5>
                <select value={date} onChange={FilteredByDates}>
                    <option value="all">All Dates</option>
                    {allDatesContainer.length && allDatesContainer.map((order, index) => {
                        return (
                            <option key={index} value={`${order}`}>{order}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <h5>Filter By Price:</h5>
                <select value={price} onChange={FilterByPrice}>
                    <option value="" disabled>default</option>
                    <option value="hightolow">high to low</option>
                    <option value="lowtohigh">low to high</option>
                </select>
            </div>
            <div>
                <h5>Filter By Total Items:</h5>
                <select value={items} onChange={FilterByTotalItems}>
                    <option value="" disabled>default</option>
                    <option value="hightolow">high to low</option>
                    <option value="lowtohigh">low to high</option>
                </select>
            </div>
        </div>
    )
}

export default FeaturesPart
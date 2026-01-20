import { Header } from '../../Components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Orders.css';
import { OrdersGrid } from './OrdersGrid';

export function Orders({ cart }) {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrder(response.data)
            })
    }, []);
    return (
        <>
            <title>Orders</title>
            <link rel='icon' href='/orders.png' />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid order={order} />
            </div>
        </>
    )
}
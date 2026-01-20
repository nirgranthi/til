import { Header } from '../Components/Header';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { FormatMoney } from '../utils/formatMoney';
import './styles/Orders.css';
import dayjs from 'dayjs';

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

                <div className="orders-grid">

                    {order.map((eachOrder) => {
                        return (
                            <div key={eachOrder.id} className="order-container">

                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div> {dayjs(eachOrder.orderTimeMs).format('MMMM D')} </div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Total:</div>
                                            <div> {FormatMoney(eachOrder.totalCostCents)} </div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div> {eachOrder.id} </div>
                                    </div>
                                </div>

                                <div className="order-details-grid">

                                    {eachOrder.products.map((eachProduct) => {
                                        return (
                                            <Fragment key={eachProduct.product.id}>
                                                <div className="product-image-container">
                                                    <img src={eachProduct.product.image} />
                                                </div>

                                                <div className="product-details">
                                                    <div className="product-name">
                                                        {eachProduct.product.name}
                                                    </div>
                                                    <div className="product-delivery-date">
                                                        Arriving on: {dayjs(eachProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                                    </div>
                                                    <div className="product-quantity">
                                                        Quantity: {eachProduct.quantity}
                                                    </div>
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

                                                <div className="product-actions">
                                                    <a href="tracking">
                                                        <button className="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
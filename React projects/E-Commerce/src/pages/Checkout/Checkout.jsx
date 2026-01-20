import axios from 'axios';
import { useEffect, useState } from 'react';
import './Checkout.css';
import './CheckoutHeader.css';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function Checkout({ cart }) {
    const [deliveryOptions, setDeliveryOption] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDeliveryOption(response.data)
            });

        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data)
            });
    }, [])

    return (
        <>
            <title>Checkout</title>
            <link rel='icon' href='/checkout.png' />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    {paymentSummary &&
                        <PaymentSummary paymentSummary={paymentSummary} />
                    }

                </div>
            </div>
        </>
    )
}
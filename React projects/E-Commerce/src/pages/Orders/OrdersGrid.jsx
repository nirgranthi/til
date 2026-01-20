import dayjs from "dayjs"
import { FormatMoney } from '../../utils/formatMoney'
import { OrderDetailsGrid } from "./OrderDetailsGrid"

export function OrdersGrid({ order }) {
    return (
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

                        <OrderDetailsGrid eachOrder={eachOrder} />

                    </div>
                )
            })}
        </div>
    )
}
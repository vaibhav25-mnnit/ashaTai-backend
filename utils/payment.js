import createSdk from 'api'

import { createOrder } from '../controllers/ordersControllers.js'
const sdk = createSdk("@cashfreedocs-new/v3#z7c5zzlkqza7c0")

export const createPayment = async (req, res) => {
  try { 
    const order = await createOrder(req.body) 
    if (order.paymentDetails) {
      res.status(200).json({
        message: "Order Placed successfully using cod.",
        data: order
      })
      return;
    }
    const date = new Date();
    const expiry = new Date(date.getTime() + 20 * 60000);

    const payment = await sdk.createOrder({
      customer_details: {
        customer_id: order.user,
        customer_name: order.address.fullName,
        customer_email: order.address.email,
        customer_phone: order.address.phoneNumber
      },
      order_id: order.id,
      order_amount: order.priceDetails.toPay,
      order_currency: 'INR',
      order_expiry_time: expiry,
    }, {
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      'x-api-version': '2022-09-01'
    }) 
    res.status(200).json( {
      message: "Order Placed successfully using online.",
      data: payment.data
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }

}

export const verifyOrder = async (req, res) => {

  sdk.server('https://sandbox.cashfree.com/pg');

  try {

    const response = await sdk.getPaymentsfororder({
      order_id: req.params.id,
      'x-client-id': process.env.CASHFREE_APP_ID,
      'x-client-secret': process.env.CASHFREE_SECRET_KEY,
      'x-api-version': '2022-09-01'
    })
    res.status(200).json(response.data)

  } catch (error) {
    res.status(500).json(error)
  }
}
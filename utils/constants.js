export const mailOptions = Object.freeze({
  orderConfirmation: 0,
  shippingConfirmation: 1,
  deliveryConfirmation: 2,
  orderCancellation: 3,
  passwordReset: 4,
});

export const orderStatus = Object.freeze({
  pending: "pending",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
  Failed: "failed",
  Delivered: "delivered",
});

// -> first create order and save to db

// -> then send that order id along with user info to create order route
// -> then create order and send the session id to front end
// -> after the payment is sucessfull or failed , verify the same with cashfree api and send response to front end and update order with the appropriate payment details like order method,etc






const date = new Date();

const expiry = new Date(date.getTime() + 30 * 60000);
console.log(date)
console.log(expiry)
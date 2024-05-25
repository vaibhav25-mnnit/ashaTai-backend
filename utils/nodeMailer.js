 
import nodemailer from "nodemailer"
import { mailOptions } from "./constants.js"

const exampleOrderItems = [
    { name: 'Item 1', quantity: 1, price: '$10' },
    { name: 'Item 2', quantity: 2, price: '$20' }
]; 
const templates = { 
  
    orderConfirmation: (customerName, orderNumber, orderDate, items, customerAddress) => ({
        subject: `Thank You for Your Order, ${customerName}!`,  html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Thank you for your purchase, ${customerName}!</h2>
            <p>Your order has been placed successfully.</p>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <h3>Items Ordered:</h3>
            <ul>
                ${items.map(item => `<li>${item.name} - Quantity: ${item.quantity} - Price: ${item.price}</li>`).join('')}
            </ul>
            <p><strong>Shipping Address:</strong></p>
            <p>${customerAddress}</p>
            <p>You can view your order status and details <a href="http://example.com/order/${orderNumber}" style="color: #1a73e8;">here</a>.</p>
            <p>Thank you for shopping with us!</p>
            <p>Best regards,<br />[Store Name] Team</p>
        </div>
    `

    }),

    shippingConfirmation: (customerName, orderNumber, carrierName, trackingNumber, estimatedDeliveryDate) => ({
        subject: `Your Order is on Its Way, ${customerName}!`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Your order is on its way, ${customerName}!</h2>
                <p>Great news! Your order <strong>${orderNumber}</strong> has been shipped.</p>
                <p><strong>Shipping Carrier:</strong> ${carrierName}</p>
                <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
                <p><strong>Estimated Delivery Date:</strong> ${estimatedDeliveryDate}</p>
                <p>You can track your package <a href="http://example.com/track/${trackingNumber}" style="color: #1a73e8;">here</a>.</p>
                <p>Thank you for shopping with us!</p>
                <p>Best regards,<br />[Store Name] Team</p>
            </div>
        `
    }),

    deliveryConfirmation: (customerName, orderNumber, deliveryDate) => ({
        subject: `Your Order Has Been Delivered, ${customerName}!`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Your order has been delivered, ${customerName}!</h2>
                <p>Your order <strong>${orderNumber}</strong> has been successfully delivered.</p>
                <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
                <p>We hope you enjoy your purchase! If you have any questions or need assistance, please feel free to contact our customer support team.</p>
                <p>Thank you for choosing [Store Name].</p>
                <p>Best regards,<br />[Store Name] Team</p>
            </div>
        `
    }),

    orderCancellation: (customerName, orderNumber, cancellationDate, refundDetails) => ({
        subject: `Your Order ${orderNumber} Has Been Cancelled`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Order Cancelled: ${orderNumber}</h2>
                <p>Hi ${customerName},</p>
                <p>We’re sorry to inform you that your order <strong>${orderNumber}</strong> has been cancelled.</p>
                <p><strong>Cancellation Date:</strong> ${cancellationDate}</p>
                <p><strong>Refund Details:</strong> ${refundDetails}</p>
                <p>If you have any questions or need further assistance, please contact our support team.</p>
                <p>We apologize for any inconvenience caused.</p>
                <p>Best regards,<br />[Store Name] Team</p>
            </div>
        `
    }),

    orderCancellation: (customerName, orderNumber, cancellationDate, refundDetails) => ({
        subject: `Your Order ${orderNumber} Has Been Cancelled`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Order Cancelled: ${orderNumber}</h2>
                <p>Hi ${customerName},</p>
                <p>We’re sorry to inform you that your order <strong>${orderNumber}</strong> has been cancelled.</p>
                <p><strong>Cancellation Date:</strong> ${cancellationDate}</p>
                <p><strong>Refund Details:</strong> ${refundDetails}</p>
                <p>If you have any questions or need further assistance, please contact our support team.</p>
                <p>We apologize for any inconvenience caused.</p>
                <p>Best regards,<br />[Store Name] Team</p>
            </div>
        `
    }),
 
    resetPassword:(user)=>({
        subject: 'Reset Your Password',
        html: `
            <!DOCTYPE html>
            <html lang="en"> 
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">

            <div style="background-color: #f5f5f5; padding: 20px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                    <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                        <td style="text-align: center;">
                            <h2 style="color: #333333;">Forgot Password</h2>
                        </td>
                        </tr>
                        <tr>
                        <td style="padding: 20px 0 30px 0; text-align: center;">
                            <p style="color: #666666;">You have requested to reset your password. Click the link below to reset your password:</p>
                             <p>
                              <a href="http://localhost:5000/auth/changepassword/${user.resetPasswordToken}?mail=${user.email}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                            </p>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </div>

            </body>
            </html>
        `
    })
};

export const createAndSendMail = async (mail,id,mailContentInfo) => {
    
    try {
    
        let mailInfo = { 
            to: mail
        }

        switch (id) {
           
            case mailOptions.orderConfirmation:  
            mailInfo = {
                ...mailInfo,
                ...templates.orderConfirmation('Customer Name', '12345', '2024-05-20', exampleOrderItems, '123 Main St, Anytown, USA')
            }     
            break;
           
            case mailOptions.shippingConfirmation: 
            mailInfo = {
                ...mailInfo,
                ...templates.shippingConfirmation('Customer Name','#12334','shiprocket','12345', '2024-05-20')
            }
                break;
            
            case mailOptions.deliveryConfirmation: 
            mailInfo = {
                ...mailInfo,
                ...templates.deliveryConfirmation('Customer Name', '12345', '2024-05-20')
            }
            break;
           
            case mailOptions.orderCancellation: 
            mailInfo = {
                ...mailInfo,
                ...templates.orderCancellation('Customer Name', '12345', '2024-05-20','refund initiated to original payment method.')
            }
            break;
            
            case mailOptions.passwordReset:
                mailInfo = {
                    ...mailInfo,
                    ...templates.resetPassword(mailContentInfo)
                }
            break;
           
            default:
                break;
        }  
        
        
    const transporter = await nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {        
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_MAIL_PASSWARD,
        },
    });
          
    
    const info = await transporter.sendMail(mailInfo);
    console.log("Message sent: %s", info.messageId); 
    } catch (err) {
        console.log(err)
    }
} 

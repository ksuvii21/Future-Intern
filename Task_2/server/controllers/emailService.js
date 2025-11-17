const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an order confirmation email to the user.
 * @param {object} order - The populated order object.
 */
const sendOrderConfirmationEmail = async (order) => {
  const { user, products, totalAmount, shippingAddress, _id } = order;

  const productListHtml = products
    .map(
      (item) => `
    <div style="display: flex; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <img src="${item.product.imageUrl || 'https://via.placeholder.com/60'}" alt="${item.product.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border-radius: 8px;" />
      <div>
        <h4 style="margin: 0; font-size: 16px;">${item.product.name}</h4>
        <p style="margin: 5px 0 0; color: #555;">Quantity: ${item.quantity}</p>
        <p style="margin: 5px 0 0; color: #555; font-weight: bold;">${(item.price * item.quantity).toLocaleString('en-IN')}</p>
      </div>
    </div>
  `
    )
    .join('');

  const mailOptions = {
    from: `"Fansee Rebel" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Your Fansee Rebel Order Confirmation #${_id.toString().slice(-8)}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
        <h2 style="color: #d55d92;">Thank you for your order, ${user.username}!</h2>
        <p>We've received your order and will process it shortly. Here are the details:</p>
        <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px;">Order Summary</h3>
        ${productListHtml}
        <div style="text-align: right; margin-top: 20px;">
          <p style="font-size: 18px; font-weight: bold;">Total: ${totalAmount.toLocaleString('en-IN')}</p>
        </div>
        <h3 style="border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 30px;">Shipping To</h3>
        <p>
          ${shippingAddress.name}<br>
          ${shippingAddress.address}<br>
          ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}
        </p>
        <p style="margin-top: 30px; font-size: 12px; color: #999;">
          You can view your order details here: <a href="${process.env.FRONTEND_URL}/orders/${_id}" style="color: #d55d92;">View Order</a>
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Sends a low stock alert to the admin.
 * @param {object} product - The product that is low in stock.
 */
const sendLowStockAlert = async (product) => {
  const mailOptions = {
    from: `"Fansee Rebel System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `❗ Low Stock Alert: ${product.name}`,
    text: `
      Warning: The stock for the following product is running low.

      Product Name: ${product.name}
      Product ID: ${product._id}
      Remaining Stock: ${product.stock}

      Please restock soon.
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderConfirmationEmail, sendLowStockAlert };
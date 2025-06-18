const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      orederStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: 
            // cartItems.map((item) => ({
            //   name: item.title,
            //   sku: item.productId,
            //   price: Number(item.price).toFixed(2),
            //   currency: "USD",
            //   quantity: Number(item.quantity),
            // })),
            cartItems.forEach((item, index) => {
              console.log(`🛒 Item ${index + 1}:`, {
                name: item.title,
                sku: item.productId,
                price: Number(item.price).toFixed(2),
                quantity: Number(item.quantity),
                isQuantityValid: typeof item.quantity === "number" && item.quantity > 0,
                isPriceValid: !isNaN(Number(item.price)),
              });
            }),

            
          },
          amount: {
            currency: "USD",
            total: Number(totalAmount).toFixed(2),
          },
          description: "description",
        },
      ],
    };

    console.log(
      "🧾 Final PayPal Payload:\n",
      JSON.stringify(create_payment_json, null, 2)
    );

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("🚀 ~ paypal.payment.create ~ error:", error);
        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          orederStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });
        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error occured in order controller",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error occured in capture payment method",
    });
  }
};

module.exports = { createOrder, capturePayment };

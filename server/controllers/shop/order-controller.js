const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

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
      cardId,
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
                  isQuantityValid:
                    typeof item.quantity === "number" && item.quantity > 0,
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
          cardId,
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
    const { payerId, paymentId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return Response.status(404).json({
        success: false,
        message: "order cann't found",
      });
    }
    (order.paymentStatus = "paid"),
      (order.orderStatus = "confirmed"),
      (order.paymentId = paymentId),
      (order.payerId = payerId);

    const getCartId = order.cardId;
    const cart = await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(202).json({
      success: true,
      message: "order confirmed!!",
      data: order,
    });
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error occured in capture payment method",
    });
  }
};

const getAllOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No Order Found!!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log("🚀 ~ getAllOrderByUser ~ e:", e);
    res.status(500).json({
      success: false,
      message: "Error occured in get All Order By User method",
    });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found!!!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log("🚀 ~ getAllOrderByUser ~ e:", e);
    res.status(500).json({
      success: false,
      message: "Error occured in get Order Details method",
    });
  }
};

module.exports = { createOrder, capturePayment ,getAllOrderByUser,getOrderDetails};

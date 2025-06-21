const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require('./routes/auth/auth-routes')
const adminProductsRoute = require('./routes/admin/products-routes')
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routers')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')


//create db connection (also create new file and import it here)
mongoose
  .connect(
    "mongodb+srv://bhavyasuthar06:bhavyasuthar061403@cluster0.9xqyk.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
  app.use('/api/auth',AuthRouter)
  app.use('/api/admin/products',adminProductsRoute)
  app.use("/api/admin/orders", adminOrderRouter);
  app.use('/api/shop/products',shopProductsRouter)
  app.use('/api/shop/cart',shopCartRouter)
  app.use('/api/shop/address',shopAddressRouter)
  app.use('/api/shop/order',shopOrderRouter)

app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`))
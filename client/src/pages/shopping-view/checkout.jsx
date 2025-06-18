import Address from "@/components/shopping-view/Address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { data } from "autoprefixer";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log("🚀 ~ ShoppingCheckout ~ cartItems:", cartItems.items);
  console.log(
    "🚀 ~ ShoppingCheckout ~ cartItems  product id quantity:",
    cartItems?.items?.quantity
  );

  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ ShoppingCheckout ~ user:", user);

  const dispatch = useDispatch()

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  console.log("🚀 ~ ShoppingCheckout ~ currentSelectedAddress:", currentSelectedAddress)
  const [isPaymentStart, setIsPaymentStart] = useState(false)

  const {approvalURL} = useSelector(state => state.shopOrder)

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  console.log("🚀 ~ ShoppingCheckout ~ totalCartAmount:", totalCartAmount);


  const handleInitiatePaypalPayment = () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0
  ? singleCartItem?.salePrice
  : singleCartItem?.price,
quantity: singleCartItem?.quantity, // ✅ fixed spelling

        // price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        // quantiy: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes},
      orderStatus: 'Pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };
    console.log("🚀 ~ handleInitiatePaypalPayment ~ orderData:", orderData)
    dispatch(createNewOrder(orderData)).then(data => console.log("data", data))
    if(data?.payload?.success){
      setIsPaymentStart(true)
    }
    else{
      setIsPaymentStart(false)
    }
  };

  if(approvalURL){
    window.location.href = approvalURL
  }
  
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress}/>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button className="w-full" onClick={handleInitiatePaypalPayment}>
              Checkout With Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;


import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ UserCartItemsContent ~ user:", user);

  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "cart item is updated successfully!!!" });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId?._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "cart item is deleted successfully!!!" });
      }
    });
    console.log("🚀 ~ handleCartItemDelete ~ getCartItem:", getCartItem);
  }

  console.log("🚀 ~ UserCartItemsContent ~ cartItem:", cartItem);
  console.log(
    "🚀 ~ UserCartItemsContent ~ cartItem?.image:",
    cartItem?.productId?.image
  );
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.productId?.image}
        alt={cartItem?.productId?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.productId?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem?.quantity == 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹
          {(
            (cartItem?.productId?.salePrice > 0
              ? cartItem?.productId?.salePrice
              : cartItem?.productId?.price) * cartItem.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="cursor-pointer mt-1"
          size={20}
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

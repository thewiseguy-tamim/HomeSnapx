import { Suspense, useEffect, useState } from "react";
import useCartContext from "../../hooks/useCartContext";
import CartSummary from "../../components/Cart/CartSummary";
import CartItemList from "../../components/Cart/CartItemList";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    error,
    updateCartItemQuantity,
    deleteCartItem,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (cart) {
      setLocalCart(cart);
    }
  }, [cart]);

  // Calculate totalPrice from items
  const totalPrice = localCart?.items
    ? localCart.items.reduce(
        (sum, item) => sum + item.service.price * item.quantity,
        0
      )
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01M5.22 5.22l13.56 13.56M19.78 5.22l-13.56 13.56"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="col-span-2">
            <CartItemList
              items={localCart?.items || []}
              handleUpdateQuantity={updateCartItemQuantity}
              handleRemoveItem={deleteCartItem}
            />
          </div>
        </Suspense>
        <div className="col-span-1">
          <CartSummary
            cartId={cartId}
            totalPrice={totalPrice}
            itemCount={localCart?.items?.length || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
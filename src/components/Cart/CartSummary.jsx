import { useState } from "react";
import authApiClient from "../../Services/auth-api-client";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const shipping = itemCount === 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
  const tax = parseFloat(totalPrice) * 0.1;
  const orderTotal = parseFloat(totalPrice) + shipping + tax;

  const deleteCart = () => {
    localStorage.removeItem("cartId");
  };

  const createOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await authApiClient.post("/orders/", { cart_id: cartId });
      if (response.status === 201) {
        deleteCart();
        alert("Order placed successfully");
        // You might want to redirect to an order confirmation page
        // window.location.href = "/order-confirmation";
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal ({itemCount} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            disabled={itemCount === 0 || isProcessing}
            onClick={createOrder}
            className="btn btn-primary w-full"
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

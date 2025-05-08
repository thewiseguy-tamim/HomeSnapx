import { useCallback, useEffect, useState } from "react";
import authApiClient from "../Services/auth-api-client";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!cartId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await authApiClient.get(`/cart/${cartId}/`);
      setCart(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error?.response?.status === 404 || error?.response?.status === 401) {
        localStorage.removeItem("cartId");
        setCartId(null);
        setCart(null);
      }
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addCartItem = useCallback(
    async (service_id, quantity = 1) => {
      if (!service_id) {
        console.error("Service ID is required");
        setError("Service ID is required");
        return null;
      }

      setLoading(true);
      try {
        const payload = { service_id, quantity };
        const response = await authApiClient.post("/cart-items/", payload);

        if (response.data?.cart) {
          localStorage.setItem("cartId", response.data.cart);
          setCartId(response.data.cart);
          await fetchCart();
        }

        setError(null);
        return response.data;
      } catch (error) {
        console.error("Error adding cart item:", error);
        setError("Failed to add item to cart");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      if (!itemId) {
        setError("Item ID is required");
        return;
      }

      setLoading(true);
      try {
        await authApiClient.patch(`/cart-items/${itemId}/`, { quantity });
        await fetchCart();
        setError(null);
      } catch (error) {
        console.error("Error updating quantity:", error);
        setError("Failed to update item quantity");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const deleteCartItem = useCallback(
    async (itemId) => {
      if (!itemId) {
        setError("Item ID is required");
        return;
      }

      setLoading(true);
      try {
        await authApiClient.delete(`/cart-items/${itemId}/`);
        await fetchCart();
        setError(null);
      } catch (error) {
        console.error("Error deleting cart item:", error);
        setError("Failed to remove item from cart");
      } finally {
        setLoading(false);
      }
    },
    [fetchCart]
  );

  const clearCart = useCallback(async () => {
    if (!cartId) return;

    setLoading(true);
    try {
      const response = await authApiClient.get(`/cart/${cartId}/`);
      const items = response.data?.items || [];

      const deletePromises = items.map((item) =>
        authApiClient.delete(`/cart-items/${item.id}/`)
      );

      await Promise.all(deletePromises);
      await fetchCart();
      setError(null);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("Failed to clear cart");
      if (error?.response?.status === 404) {
        localStorage.removeItem("cartId");
        setCartId(null);
        setCart(null);
      }
    } finally {
      setLoading(false);
    }
  }, [cartId, fetchCart]);

  const getCartTotal = useCallback(() => {
    if (!cart?.items || !Array.isArray(cart.items)) return "0.00";

    const total = cart.items.reduce((sum, item) => {
      const price = parseFloat(item?.service?.price || 0);
      return sum + price * (item.quantity || 1);
    }, 0);

    return total.toFixed(2);
  }, [cart]);

  return {
    cart,
    loading,
    error,
    cartId,
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    clearCart,
    refreshCart: fetchCart,
    getCartTotal,
  };
};

export default useCart;

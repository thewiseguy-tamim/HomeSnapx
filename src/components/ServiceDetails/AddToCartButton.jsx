import { useState } from "react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import useCartContext from "../../hooks/useCartContext";

const AddToCartButton = ({ service }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addCartItem } = useCartContext();

  const addToCart = async () => {
    if (!service || !service.id) return;
    setIsAdding(true);
    try {
      await addCartItem(service.id, 1); // Corrected function name and argument
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      className="btn btn-primary w-full"
      onClick={addToCart}
      disabled={isAdding || isAdded}
    >
      {isAdding ? (
        <span className="flex items-center">
          <span className="loading loading-spinner loading-sm mr-2"></span>
          Adding...
        </span>
      ) : isAdded ? (
        <span className="flex items-center">
          <FaCheck className="mr-2 h-4 w-4" />
          Added to Cart
        </span>
      ) : (
        <span className="flex items-center">
          <FaShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </span>
      )}
    </button>
  );
};

export default AddToCartButton;

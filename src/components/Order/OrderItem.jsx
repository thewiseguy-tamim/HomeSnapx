const OrderItems = ({ item }) => {
    const name = item?.service?.name || "Unknown Product";
    const price = item?.price ? parseFloat(item.price).toFixed(2) : "0.00";
    const quantity = item?.quantity || 1;
    const totalPrice = item?.total_price ? parseFloat(item.total_price).toFixed(2) : "0.00";
  
    return (
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 font-medium">{name}</td>
        <td className="px-4 py-3 text-right">${price}</td>
        <td className="px-4 py-3 text-right">{quantity}</td>
        <td className="px-4 py-3 text-right">${totalPrice}</td>
      </tr>
    );
  };
  
  export default OrderItems;
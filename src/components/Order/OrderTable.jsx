const OrderTable = ({ items }) => {
  console.log("OrderTable items:", items); // Debug: Log items received

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.service?.name || "Unknown Item"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.quantity || 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${parseFloat(item.service?.price || 0).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                $
                {parseFloat(
                  (item.service?.price || 0) * (item.quantity || 1)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
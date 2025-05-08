const FilterSection = ({
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center mx-auto">
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search services..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Sorting */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By Price
        </label>
        <select
          className="w-full p-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;

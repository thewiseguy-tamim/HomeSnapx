import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const FilterSection = ({
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get display text for current sort option
  const getSortDisplayText = () => {
    switch(sortOrder) {
      case "price": return "Price: Low to High";
      case "-price": return "Price: High to Low";
      case "rating": return "Best Rating";
      case "newest": return "Newest";
      default: return "Most Popular";
    }
  };
  
  useEffect(() => {
    setIsMounted(true);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`mb-8 flex flex-col md:flex-row gap-6 justify-between mx-auto transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Search bar - styled like the screenshot */}
      <div className="flex-grow md:w-2/3">
        <div className="flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm">
          <div className="pl-3 pr-2 text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full py-2 px-2 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Sort dropdown - styled like the screenshot */}
      <div className="md:w-1/4 relative" ref={dropdownRef}>
        <div 
          className="flex items-center justify-between cursor-pointer bg-white border border-gray-200 transition-all duration-200 hover:bg-gray-50 px-3 py-1.5 rounded-md shadow-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="font-medium text-gray-800">Sort</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
        </div>
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden transition-all transform origin-top-right">
            <div className="py-1">
              <button 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortOrder === "" ? "font-medium text-blue-700" : "text-gray-800"}`}
                onClick={() => { handleSorting(""); setIsDropdownOpen(false); }}
              >
                Most Popular
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortOrder === "rating" ? "font-medium text-blue-700" : "text-gray-800"}`}
                onClick={() => { handleSorting("rating"); setIsDropdownOpen(false); }}
              >
                Best Rating
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortOrder === "newest" ? "font-medium text-blue-700" : "text-gray-800"}`}
                onClick={() => { handleSorting("newest"); setIsDropdownOpen(false); }}
              >
                Newest
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortOrder === "price" ? "font-medium text-blue-700" : "text-gray-800"}`}
                onClick={() => { handleSorting("price"); setIsDropdownOpen(false); }}
              >
                Price: Low to High
              </button>
              <button 
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${sortOrder === "-price" ? "font-medium text-blue-700" : "text-gray-800"}`}
                onClick={() => { handleSorting("-price"); setIsDropdownOpen(false); }}
              >
                Price: High to Low
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
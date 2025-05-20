import { useState } from "react";
import ServiceItem from "../ServicesSS/ServiceItem";
import Pagination from "./Pagination";
import FilterSection from "./FilterSection";
import useFetchService from "../../hooks/useFetchService";
import bgg from "../../assets/bgg.jpg";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { services, loading, totalPages } = useFetchService(
    currentPage,
    searchQuery,
    sortOrder
  );

  return (
    <div
      style={{
        backgroundImage: `url(${bgg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Our Services</h1>
      
        <FilterSection
          searchQuery={searchQuery}
          handleSearchQuery={setSearchQuery}
          sortOrder={sortOrder}
          handleSorting={setSortOrder}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading services...</p>
          ) : (
            services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ShopPage;
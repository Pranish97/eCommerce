import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useLocation();

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search, {
      method: SummaryApi.searchProduct.method,
    });

    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}

      {data.length === 0 && !loading && (
        <p className="text-center text-lg">No data Found!</p>
      )}

      {data.length !== 0 && !loading && (
        <div>
          <p className="text-lg font-semibold my-3">
            Search Result: {data.length}
          </p>
          <VerticalCard loading={loading} data={data} />
        </div>
      )}
    </div>
  );
};

export default SearchProduct;

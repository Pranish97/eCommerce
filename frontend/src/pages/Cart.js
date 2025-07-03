import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      setData(dataResponse.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-xl my-3">
        {(data.length === 0) & !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

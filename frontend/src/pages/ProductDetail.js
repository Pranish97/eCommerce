import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const fetchProductDetail = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();
    setActiveImage(dataResponse?.data.productImage[0]);

    setData(dataResponse?.data);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-[350px] flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[350px] w-[300px] ld:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImage}
              className="h-full w-full mix-blend-multiply object-scale-down "
            />
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollBar-none h-full">
                {productImageListLoading?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollBar-none h-full">
                {data?.productImage.map((imageUrl, index) => {
                  return (
                    <div
                      key={imageUrl}
                      className="h-20 w-20 bg-slate-300 rounded hover:scale-105"
                    >
                      <img
                        src={imageUrl}
                        onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                        onClick={() => handleMouseEnterProduct(imageUrl)}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div>Product details</div>
      </div>
    </div>
  );
};

export default ProductDetail;

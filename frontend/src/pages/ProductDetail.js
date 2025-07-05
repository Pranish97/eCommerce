import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProduct from "../components/CategoryWiseProduct";
import addToCart from "../helpers/addToCart";
import Context from "../context";

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
  console.log(data.category);

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

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
  }, [params]);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-14">
        <div className="h-[400px] flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[400px] w-[320px] ld:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full mix-blend-multiply object-scale-down"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomOutImage}
            />
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[540px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] overflow-hidden mix-blend-multiply scale-125"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
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

        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-300 px-5 rounded-full h-6 lg:h-8 w-full py-2 animate-pulse "></p>
            <h2 className="text-2xl md:text-4xl font-medium h-6  bg-slate-300 lg:h-8  animate-pulsew-full "></h2>
            <p className="capitalize text-slate-500 bg-slate-300 min-w-[100px] lg:h-8  animate-pulse h-6 w-full"></p>

            <div className="text-yellow-600 bg-slate-300 h-6 animate-pulseflex items-center gap-1 lg:h-8  w-full"></div>

            <div className="flex items-center gap-7 text-2xl font-medium my-2 lg:text-3xl h-6 animate-pulse lg:h-8  bg-slate-300 rounded w-full">
              <p className="bg-slate-300 w-full "></p>
              <p className=" bg-slate-300 w-full"></p>
            </div>

            <div className="flex items-center gap-4 w-full">
              <button className="h-6 lg:h-8  bg-slate-300 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-slate-300 rounded animate-pulse w-full"></button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8  bg-slate-300 rounded animate-pulse w-full"></p>
              <p className=" h-10 lg:h-12 bg-slate-300 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-yellow-200 text-yellow-600 px-3 rounded-full w-fit py-1">
              {data?.brandName}
            </p>
            <h2 className="text-2xl md:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-500">{data?.category}</p>

            <div className="text-yellow-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-7 text-2xl font-medium my-2 lg:text-3xl ">
              <p className="text-yellow-600">${data?.sellingPrice}.00</p>
              <p className="text-slate-400 line-through">${data?.price}.00</p>
            </div>

            <div className="flex items-center gap-4 my-4">
              <button
                onClick={(e) => handleBuyProduct(e, data?._id)}
                className="border border-yellow-600 rounded px-3 py-2 min-w-[100px] text-yellow-600 font-medium hover:bg-yellow-600 hover:text-white"
              >
                Buy
              </button>
              <button
                onClick={(e) => handleAddToCart(e, data?._id)}
                className="border border-yellow-600 rounded px-3 py-2 min-w-[100px] text-white bg-yellow-600 font-medium hover:bg-white hover:text-yellow-600"
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategoryWiseProduct
          category={data.category}
          heading="Recommended Product"
        />
      )}
      <CategoryWiseProduct category="mouse" heading="Mouse" />
    </div>
  );
};

export default ProductDetail;

import React, { useContext, useEffect, useRef, useState } from "react";
import fectchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const CategoryWiseProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    await fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fectchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollBar-none transition-all">
        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded shadow-2xl "
                >
                  <div className="bg-slate-300 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1 p-1 py-2 animate-pulse bg-slate-300"></h2>
                    <p className="capitalize text-slate-500 p-1 animate-pulse bg-slate-300 py-2"></p>
                    <div className="flex gap-4">
                      <p className="text-yellow-600 font-medium p-1 animate-pulse bg-slate-300 w-full py-2"></p>
                      <p className="text-slate-500 line-through p-1 animate-pulse bg-slate-300 w-full py-2"></p>
                    </div>
                    <button className=" text-white text-sm px-3 rounded p-1 animate-pulse bg-slate-300 py-2"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product._id}
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded shadow-2xl "
                >
                  <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                    <img
                      src={product?.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-semibold md:text-lg text-base text-ellipsis line-clamp-1">
                      {product?.productName}
                    </h2>
                    <p className="capitalize text-slate-500">
                      {product?.category}
                    </p>
                    <div className="flex gap-4">
                      <p className="text-yellow-600 font-medium">
                        ${product?.sellingPrice}
                      </p>
                      <p className="text-slate-500 line-through">
                        ${product?.price}
                      </p>
                    </div>
                    <button
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded"
                      onClick={(e) => handleAddToCart(e.product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryWiseProduct;

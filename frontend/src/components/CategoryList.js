import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProdct, setcategoryProduct] = useState();
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url, {
      method: SummaryApi.categoryProduct.method,
    });

    const dataResponse = await response.json();
    setLoading(false);

    setcategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollBar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  key={"categoryLoading" + index}
                  className="h-16 w-16 md:w-20 md:h-20 rounded overflow-hidden bg-slate-200 animate-pulse"
                ></div>
              );
            })
          : categoryProdct?.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer hover:scale-105 transition-all"
                  key={product.category}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden p-4 bg-white flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base">
                    {product?.category.charAt(0).toUpperCase() +
                      product?.category.slice(1)}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;

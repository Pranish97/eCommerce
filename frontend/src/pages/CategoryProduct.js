import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategroy from "../helpers/productCategroy";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryList = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryList.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategroy] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
  };

  const handleSelectCategroy = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategroy((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dec") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="hidden lg:grid grid-cols-[200px_1fr]">
        {/* left Side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort By */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleOnChangeSortBy}
                  checked={sortBy === "asc"}
                  value={"asc"}
                />
                <label>Price- Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dec"}
                  onChange={handleOnChangeSortBy}
                  value={"dec"}
                />
                <label>Price- High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategroy.map((category, index) => {
                return (
                  <div className="flex items-center gap-3" key={category.id}>
                    <input
                      type="checkbox"
                      name="category"
                      id={category?.value}
                      value={category?.value}
                      onChange={handleSelectCategroy}
                      checked={selectCategory[category?.value]}
                    />
                    <label htmlFor={category?.value}>{category?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* Right Side/Product */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg py-2">
            Search Results: {data?.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] w-full overflow-y-auto max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

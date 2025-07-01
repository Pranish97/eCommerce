import { MdAdd } from "react-icons/md";
import UploadProduct from "../components/UploadProduct";
import { useEffect, useState } from "react";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
    });

    const dataResponse = await response.json();

    setAllProducts(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg ">All Products</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className=" flex items-center justify-between border py-2 px-4 bg-yellow-600 rounded text-white hover:scale-105"
        >
          <MdAdd className="pr-1 text-2xl" />
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-[65px] py-4 h-[calc(100vh-190px) overflow-y-scroll ">
        {allProducts?.map((product, index) => {
          return (
            <AdminProductCard
              fetchData={fetchAllProduct}
              data={product}
              key={index + "allProducts"}
            />
          );
        })}
      </div>

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;

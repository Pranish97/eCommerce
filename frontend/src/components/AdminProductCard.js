import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white rounded p-4 ">
      <div className="w-[160px] ">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            className="object-fill mx-auto h-full"
            src={data?.productImage[0]}
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">${data?.sellingPrice}</p>

          <div
            onClick={() => setEditProduct(true)}
            className="w-fit ml-auto p-2 cursor-pointer bg-green-100 hover:bg-green-600 rounded hover:text-white"
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          fetchData={fetchData}
          productData={data}
          onClose={() => setEditProduct(false)}
        />
      )}
    </div>
  );
};

export default AdminProductCard;

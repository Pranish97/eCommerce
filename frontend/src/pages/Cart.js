import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

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

  const handleloading = async () => {
    await fetchData();
  };
  useEffect(() => {
    setLoading(true);
    handleloading();
    setLoading(false);
  }, []);

  const increaseQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      toast.success(responseData.message);
    }
  };

  const decreaseQuantity = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
        toast.success(responseData.message);
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
      toast.success(responseData.message);
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div className="text-center text-xl my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between ">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={index + 1}
                    className="w-full bg-slate-300 h-32 my-2 border border-slate-400 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add to Car Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px_1fr] gap-4"
                  >
                    <div className="w-32 h-32 bg-slate-300">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* Delete Product */}
                      <div
                        onClick={() => deleteCartProduct(product?._id)}
                        className="absolute right-0 text-red-600 rounded p-2 text-2xl mr-3 hover:text-white hover:bg-red-600 cursor-pointer"
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 w-96">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-600">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-yellow-700 font-medium text-lg">
                          ${product?.productId?.sellingPrice}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          Total: $
                          {product?.productId?.sellingPrice * product?.quantity}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => {
                            decreaseQuantity(product?._id, product?.quantity);
                          }}
                          className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(product?._id, product?.quantity)
                          }
                          className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-300 border border-slate-400 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-yellow-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-3 font-medium text-lg text-slate-600">
                <p>Quantity:</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-3 font-medium text-lg text-slate-600">
                <p>Total Price:</p>
                <p>${totalPrice}</p>
              </div>

              <button className="bg-blue-600 px-4 py-1 w-full text-white rounded mt-5">
                Payement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

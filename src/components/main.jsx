import { useState } from "react";
import products from "./products";
import { FaCartPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  decrease,
  increase,
  removeCart,
} from "../slices/productSlice";
import { NavLink, useNavigate } from "react-router-dom";

export default function Main() {
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [inpVal, setInpVal] = useState("");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [countCart, setCountCart] = useState(0);
  const navigate = useNavigate();

  const product = products.filter((val) =>
    val.name.toLowerCase().includes(inpVal.toLowerCase())
  );
  const totalPrice = state.reduce(
    (prev, acc) => prev + acc.price * acc.quantity,
    0
  );

  const handleAddCart = (id, name, picture, price) => {
    if (!state.some((item) => item.id === id)) {
      dispatch(
        addProductToCart({ id: id, name: name, picture: picture, price: price })
      );
    }
    setCountCart((p) => (!state.some((item) => item.id === id) ? p + 1 : p));
  };

  const handleRemoveCart = (id) => {
    dispatch(removeCart({ id: id }));
  };

  const handleIncreaseCart = (id) => {
    dispatch(increase({ id }));
  };
  const handleDecreaseCart = (id) => {
    dispatch(decrease({ id }));
  };

  return (
    <>
      {hideSidebar && (
        <div className="w-full sm:w-[60%] md:w-[40%] h-full bg-white overflow-auto fixed right-0 top-0 z-50 shadow-lg transition-all duration-300">
          {/* Header */}
          <div
            onClick={() => setHideSidebar(false)}
            className="bg-green-600 w-full h-12 flex items-center fixed top-0"
          >
            <IoClose className="cursor-pointer size-7 ms-3 text-white" />
            <p className="text-white text-lg font-semibold ms-3">Your Cart</p>
          </div>
          <div className="mt-14 px-3">
            <ul>
              {state.map((curVal) => (
                <li
                  key={curVal.id}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 border-b pb-2 pt-2"
                >
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <img
                      src={curVal.picture}
                      alt={curVal.name}
                      className="w-20 h-20 rounded-md border"
                    />
                    <div>
                      <p className="font-bold">{curVal.name}</p>
                      <p className="font-semibold">Rs: ${curVal.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded"
                      onClick={() => handleDecreaseCart(curVal.id)}
                    >
                      -
                    </button>
                    <p>{curVal.quantity}</p>
                    <button
                      className="w-6 h-6 flex items-center justify-center bg-gray-400 text-white rounded"
                      onClick={() => handleIncreaseCart(curVal.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleRemoveCart(curVal.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-600 w-full h-14 px-4 fixed bottom-0 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-white font-bold text-lg sm:text-2xl">
              Total: ${totalPrice}
            </p>
            <NavLink to="/checkout">
              <button
                type="button"
                className="border border-white w-24 h-9 text-white cursor-pointer mt-2 sm:mt-0"
              >
                Checkout
              </button>
            </NavLink>
          </div>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="w-full min-h-36 bg-green-500 text-center py-5 px-4">
          <div className="flex justify-between items-center mb-4">
            <button
              className="border border-white rounded-sm text-center w-20 h-8 text-white cursor-pointer"
              onClick={() => {
                localStorage.removeItem("authToken");
                navigate("/");
              }}
            >
              Logout
            </button>
            <button
              className="text-white cursor-pointer flex items-center gap-1"
              onClick={() => setHideSidebar(true)}
            >
              <FaCartPlus className="size-7" />
              <p className="text-xs bg-white w-5 h-5 rounded-full flex justify-center items-center text-black">
                {countCart}
              </p>
            </button>
          </div>
          <p className="text-2xl sm:text-3xl text-white font-bold">
            Shopping Cart
          </p>
          <input
            type="text"
            className="bg-white mt-5 h-10 ps-2 w-full sm:w-80 rounded-sm border"
            placeholder="Search products..."
            value={inpVal}
            onChange={(e) => setInpVal(e.target.value)}
          />
        </div>

        {/* Products */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 py-6">
          {product.length > 0 ? (
            product.map((curElem) => {
              const inCart = state.find((item) => item.id === curElem.id);
              return (
                <li
                  key={curElem.id}
                  className="bg-white w-full sm:w-60 h-auto border rounded-2xl flex flex-col gap-2 justify-center items-center p-4 shadow-md"
                >
                  <img
                    src={curElem.picture}
                    className="w-24 h-24 object-contain"
                    alt={curElem.name}
                  />
                  <p className="font-bold text-lg text-center">
                    {curElem.name}
                  </p>
                  <p>Price: ${curElem.price}</p>
                  <button
                    className="bg-green-500 w-[70%] py-1 cursor-pointer hover:bg-green-600 text-white rounded-sm"
                    onClick={() =>
                      handleAddCart(
                        curElem.id,
                        curElem.name,
                        curElem.picture,
                        curElem.price
                      )
                    }
                  >
                    {inCart ? `Added (${inCart.quantity})` : "Add to cart"}
                  </button>
                </li>
              );
            })
          ) : (
            <p className="text-gray-600 mt-5 col-span-full text-center">
              No products found
            </p>
          )}
        </ul>
      </div>
    </>
  );
}

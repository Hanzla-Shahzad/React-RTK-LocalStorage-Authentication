import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useState } from "react";

export default function CheckOut() {
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [buyDone, setBuyDone] = useState(false);

  const subtotal = state.reduce(
    (prev, acc) => prev + acc.price * acc.quantity,
    0
  );
  const shipping = 120;
  const total = subtotal + shipping;

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 border-r-2 p-8">
        <div className="flex justify-between items-center mb-10">
          <p className="text-black font-bold text-4xl">Metflix</p>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <MdOutlineShoppingBag className="size-6 cursor-pointer" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for shopping");
            setBuyDone(true);
          }}
          className="space-y-4"
        >
          <div>
            <p className="font-semibold mb-1">Contact</p>
            <input
              type="email"
              className="w-full border rounded p-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <p className="font-semibold mb-1">Delivery</p>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter delivery location"
              required
            />
          </div>

          <p className="text-gray-600">Please select city from search</p>

          <div>
            <p className="font-semibold">
              Country/region <span className="text-gray-500">Pakistan</span>
            </p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              className="w-1/2 border rounded p-2"
              placeholder="First name"
              required
            />
            <input
              type="text"
              className="w-1/2 border rounded p-2"
              placeholder="Last name"
              required
            />
          </div>

          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Address"
            required
          />
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="City"
            required
          />
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Postal Code"
            required
          />
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Phone"
            required
          />

          <p className="font-semibold">
            Shipping Charges <span className="text-green-600">Free</span>
          </p>

          <button
            type="submit"
            className={`${
              buyDone
                ? "w-full bg-White text-white py-3 rounded-lg bg-green-500 "
                : "w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            }`}
          >
            {buyDone ? "Done" : "Buy"}
          </button>
        </form>
      </div>

      <div className="bg-gray-100 w-1/2 p-8 overflow-auto h-screen">
        <h2 className="text-2xl font-bold mb-5">Your Cart</h2>

        <ul className="space-y-4">
          {state.map((curElem) => (
            <li
              key={curElem.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={curElem.picture}
                  alt={curElem.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <p className="font-medium text-lg">{curElem.name}</p>
              </div>

              <p className="font-semibold text-gray-700">
                Rs. {curElem.price * curElem.quantity}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

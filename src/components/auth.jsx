import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [inpData, setInpData] = useState({
    email: "",
    password: "",
  });
  const authToken = localStorage.getItem("authToken");
  const token = JSON.parse(authToken);
  console.log(token);

  useEffect(() => {
    if (token) {
      navigate("/Main");
    }
  }, [token]);
  const handleInpChange = (e) => {
    const { value, name } = e.target;
    setInpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginBtn = () => {
    if (!inpData.email || !inpData.password) {
      alert("Please fill all fields");
      return;
    } else {
      navigate("Main");
      localStorage.setItem("authToken", JSON.stringify(inpData));
      alert("Login Successful ✅");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login to Your Account
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            onChange={handleInpChange}
            value={inpData.email}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            onChange={handleInpChange}
            value={inpData.password}
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          onClick={handleLoginBtn}
        >
          Login
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        <button className="w-full rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition">
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

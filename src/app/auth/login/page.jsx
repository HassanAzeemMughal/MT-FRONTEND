"use client";
import { login } from "@/features/auth/auth-slice";
import { postApi } from "@/services/ApiService";
import { notification } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Email and Password are required.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(null);
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      setIsSubmitting(false); // 👈 validation fail hone pr false karna hoga

      return;
    }

    try {
      const res = await postApi("auth/login", formData);

      if (res.success === true) {
        toast.success(res.message || "Login Successful");
        dispatch(login({ user: res.user, token: res.authToken }));

        setFormData({ email: "", password: "" });
        setErrors(null);

        const redirectTo = searchParams.get("session") || "/";
        router.push(redirectTo);
      } else {
        setErrors(res.error || "Login failed. Please try again!");
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      if (error.message.includes("Email not verified")) {
        setErrors(
          "Email not verified. Please verify your email before logging in."
        );
      } else {
        setErrors(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between px-20 py-8 bg-text-600">
          <span className="text-[16px] font-semibold">LOGIN</span>
          <span className="text-[16px] font-semibold">HOME / LOGIN</span>
        </div>
        <div className="flex items-center justify-center py-10">
          <form onSubmit={handleLogin}>
            <div className="bg-gray-100 p-8 shadow-md rounded-lg w-100">
              <h2 className="text-lg font-semibold text-center mb-4">
                Welcome back! Let's get you signed in.
              </h2>
              <div className="flex border-b mb-4">
                <button className="flex-1 text-center pb-2 border-b-2 border-black">
                  Password
                </button>
                <button className="flex-1 text-center pb-2 text-gray-400">
                  OTP
                </button>
              </div>
              {errors && <p className="text-red-500 text-sm mb-2">{errors}</p>}

              <input
                type="email"
                placeholder="admin@pharmora.ac.uk"
                className="w-full px-4 py-2 border rounded-md bg-blue-100 mb-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded-md bg-blue-100 mb-4"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className={`w-full py-2 text-white rounded-md font-semibold ${
                  isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-red-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "LOGIN"}
              </button>
              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                Lost your password?
              </p>
              <p className="text-center text-sm text-gray-600 mt-1">
                Don't have an account?{" "}
                <a href="#" className="text-gray-700 font-semibold">
                  Register
                </a>
              </p>
              <div className="text-center text-gray-500 text-sm my-3">OR</div>
              <div className="flex justify-center space-x-4">
                <button className="p-3 bg-gray-700 rounded-md text-white">
                  G
                </button>
                <button className="p-3 bg-blue-600 rounded-md text-white">
                  f
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

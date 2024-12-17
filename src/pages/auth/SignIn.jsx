"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Correct import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "@/validations/validationSchema";
import { loginUser } from "@/database/firebseAuth";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/database/firebaseUtils";
import { logInUserRedux } from "../../features/auth/authSlice";

// Google SVG Icon
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-5 h-5"
  >
    <path
      fill="#4285F4"
      d="M24 9.5c3.54 0 6.73 1.22 9.23 3.25l6.9-6.9C35.95 2.38 30.32 0 24 0 14.66 0 6.73 5.84 3.4 14.26l7.98 6.2C12.84 13.18 17.94 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.05 24.5c0-1.4-.12-2.76-.35-4.07H24v8.13h12.46c-.96 4.38-3.95 8.08-8.46 10.08l7.98 6.2C42.69 40.59 46.05 33.04 46.05 24.5z"
    />
    <path
      fill="#FBBC05"
      d="M11.42 28.55c-1.07-3.18-1.07-6.62 0-9.8l-7.98-6.2C.65 16.3 0 20.08 0 24c0 3.92.65 7.7 1.85 11.45l7.98-6.2z"
    />
    <path
      fill="#EA4335"
      d="M24 48c6.32 0 11.95-2.38 16.13-6.25l-7.98-6.2c-2.18 1.46-4.96 2.3-8.15 2.3-6.06 0-11.16-3.68-13.43-8.96l-7.98 6.2C6.73 42.16 14.66 48 24 48z"
    />
  </svg>
);

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resp = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (resp.error) {
        Swal.fire({
          icon: "error",
          title: `Error: ${resp.code}`,
          text: resp.message || "Something went wrong. Please try again!",
          timer: 3000,
          timerProgressBar: true,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Login successful!",
        text: "Welcome back!",
        timer: 3000,
        timerProgressBar: true,
      });
      
      let userProfile = await getUserProfile(resp.id)
      console.log(userProfile);
      
      let userInfo = {
        id: resp.id,
        email: resp.email,
        role: userProfile.role,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName
        
      }
      console.log(userInfo);
      
      dispatch(logInUserRedux(userInfo));
      
      // reset();
      // Redirect to dashboard or home page
      navigate("/p");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unexpected Error!",
        text: error.message || "Please try again later.",
        timer: 4000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Sign in to your account
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Welcome back! Please enter your details.
        </p>

        {/* Social Signup */}
        <div className="flex gap-4 mb-4">
          <Button
            variant="outline"
            className="flex items-center justify-center w-full gap-2"
          >
            <GoogleIcon /> Google
          </Button>
        </div>

        <Separator className="mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}

          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              className="mt-4 pe-9 peer"
            />
            <div className="absolute inset-y-0 flex items-center justify-center pointer-events-none end-0 pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative mt-4">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className=""
            />
            <button
              type="button"
              className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue
          </Button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { registerFormSchema } from "@/validations/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputPasswordWithHookForm from "@/components/ui/passwordInput";
import { Mail } from "lucide-react";
import { registerUser } from "@/database/firebseAuth";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
    setValue,
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: 'user'
      
    }
    const resp = await registerUser(data)
    if(resp.error){
      console.log('error hoyeche');
      
    }
    console.log(resp); // Replace with your API integration
    // reset(); // Reset form values
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-2xl font-semibold text-center">
          Create your account
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Welcome! Please fill in the details to get started.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Separator className="mb-4" />

          {/* First and Last Name Fields */}
          <div className="flex gap-4">
            {/* First Name */}
            <div className="flex-1">
              <Input
                {...register("firstName")}
                type="text"
                placeholder="First name"
                className="pl-4"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex-1">
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Last name"
                className="pl-4"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <Input
              {...register("email")}
              type="email"
              placeholder="Email address"
              className="mt-4 peer pe-9"
            />
            <div className="absolute inset-y-0 flex items-center justify-center pointer-events-none end-0 pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Mail size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <div className="relative mt-4">
            <InputPasswordWithHookForm
              {...register("password")}
              name="password"
              placeholder="Enter your password"
              setValue={setValue}
              resetTrigger={isSubmitted} // Pass isSubmitted as reset trigger
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue
          </Button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;

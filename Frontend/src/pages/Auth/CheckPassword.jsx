import { useLogin } from "@/hooks/auth.hook";
import React from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCheckEmail } from "@/hooks/auth.hook";
import { toast, useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";

function CheckPassword() {
  const email = useSelector((state) => state.auth.user.email);
  const { mutateAsync: login } = useLogin();
  console.log("check pass mounted");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    console.log(email);
    const res = await login({ email, password });
    if (res?.success) {
      toast({
        variant: "primary",
        title: res.message,
      });

      dispatch(setUser(res.data));
    } else {
      navigate("/auth/register");
    }
    console.log(res);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center text-white">
        Check your Password
      </h1>
      <form className="mt-8 w-96" onSubmit={handleSubmit}>
        <Input
          type="password"
          name="password"
          label="password"
          placeholder="Enter your password"
          className="text-white"
        />
        <Button type="submit" className="mt-4">
          Send
        </Button>
      </form>
    </div>
  );
}

export default CheckPassword;

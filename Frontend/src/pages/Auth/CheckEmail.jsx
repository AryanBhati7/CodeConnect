import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCheckEmail } from "@/hooks/auth.hook";
import { toast, useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/authSlice";
import { useNavigate } from "react-router-dom";

function CheckEmail() {
  const { mutateAsync: checkEmail } = useCheckEmail();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    const res = await checkEmail(email);
    if (res?.success) {
      toast({
        variant: "primary",
        title: res.message,
      });
      dispatch(setUser(res.data));
      navigate("/auth/check-password");
    } else {
      navigate("/auth/register");
    }
    console.log(res);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">Check your email</h1>
      <form className="mt-8 w-96" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <Button type="submit" className="mt-4">
          Send
        </Button>
      </form>
    </div>
  );
}

export default CheckEmail;

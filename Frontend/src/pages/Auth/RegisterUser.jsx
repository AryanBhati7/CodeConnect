import React, { useState, useEffect, memo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import authbg from "../../assets/auth-bg.jpg";
import { Label } from "@/components/ui/label";
import { useLogin, useRegisterUser } from "@/hooks/auth.hook";
import { useDispatch } from "react-redux";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { setUser } from "@/features/authSlice";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  avatar: z.any(),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(1, "Password is required"),
});

const AvatarField = memo(
  ({ selectedAvatar }) =>
    selectedAvatar && (
      <div className="w-full flex justify-center items-center">
        <Avatar>
          <AvatarImage
            src={URL.createObjectURL(selectedAvatar)}
            className="w-36 h-36 rounded-lg object-cover"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>
    )
);

function RegisterUser() {
  const navigate = useNavigate();
  const email = useLocation().state;
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: email || "",
      password: "",
    },
  });
  const { mutateAsync: registerUser, isPending } = useRegisterUser();
  const { mutateAsync: loginUser } = useLogin();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    data.avatar = selectedAvatar;
    console.log(data);
    const res = await registerUser(data);
    if (res?.success) {
      toast({
        variant: "success",
        title: res.message,
      });
      const loginRes = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (loginRes?.success) {
        dispatch(setUser(res.data));
        navigate("/");
      }
    } else {
      toast({
        variant: "destructive",
        title: res?.error,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <section className="h-screen pt-[50px] overflow-hidden px-10 flex justify-center items-center flex-wrap">
          <div className="container relative h-full flex items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative h-[90%] flex-col p-4 dark:border-r justify-center items-center hidden lg:flex">
              <img
                src={authbg}
                className="h-full w-full object-contain rounded-xl"
              />
            </div>
            <div className="lg:p-4">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                    encType="multipart/form-data"
                  >
                    <AvatarField selectedAvatar={selectedAvatar} />

                    <Input
                      name="avatar"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedAvatar(e.target.files[0])}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="johndoe@example.com"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="******"
                              type="password"
                              {...field}
                              className="mb-5"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="bg-white w-full mt-8"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default RegisterUser;

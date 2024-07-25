import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCheckEmail } from "@/hooks/auth.hook";
import { toast, useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Github, LoaderIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import authbg from "../../assets/auth-bg.jpg";
import Header from "@/components/Header";
function CheckEmail() {
  const { mutateAsync: checkEmail, isPending, isError } = useCheckEmail();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email is required",
      });
      return;
    }
    const res = await checkEmail(email);
    if (res?.data) {
      navigate("/auth/check-password", { state: res.data });
    } else {
      navigate("/auth/register", { state: email });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-center items-center flex-grow w-full">
        <section className="flex flex-col items-center justify-center h-full w-full max-w-4xl p-4 lg:flex-row lg:gap-20">
          <div className="hidden lg:flex lg:w-1/2 lg:justify-center lg:items-center h-full">
            <img
              src={authbg}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome to the Community
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email to join the community
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-2">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isPending}
                  />
                  <Button className="bg-white" disabled={isPending}>
                    {isPending && <div>Loading...</div>}
                    Sign In with Email
                  </Button>
                </div>
              </form>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <Button variant="outline" type="button" disabled={isPending}>
                  {isPending ? (
                    <LoaderIcon />
                  ) : (
                    <Github className="mr-2 h-4 w-4" />
                  )}
                  GitHub
                </Button>
                <Button variant="outline" type="button" disabled={isPending}>
                  {isPending ? (
                    <LoaderIcon />
                  ) : (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        fill="currentColor"
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      />
                    </svg>
                  )}
                  Google
                </Button>
              </div>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckEmail;

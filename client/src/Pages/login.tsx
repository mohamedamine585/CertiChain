/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import { AlertCircle, Github, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import useAuthStore from "@/store/authStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setErrorMessage] = useState(null);
  //const { login, error, setErrorMessage } = useAuthStore();

  useEffect(() => {
    setErrorMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.email, data.password);
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-max">
        <div className="flex flex-col space-y-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-foreground">
            Log into your account
          </h1>
        </div>
        {error && (
          <Alert>
            <AlertCircle color="white" className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground"> Email </FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    placeholder="m@example.com"
                    required
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <div className="flex justify-between">
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <a
                      href="/forgot-password"
                      className="text-xs text-muted-foreground"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="absolute outline-none cursor-pointer top-[24px] right-4"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <Eye className="h-6 w-6 text-foreground dark:text-muted-foreground transition-all" />
                    ) : (
                      <EyeOff className="h-6 w-6 text-foreground dark:text-muted-foreground transition-all" />
                    )}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <Github />
          </Button>
          <Button variant="outline" className="w-full">
            <Github />
          </Button>
        </div>
        <div className="w-auto text-center text-sm text-muted-foreground">
          <span className="text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
          </span>
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}

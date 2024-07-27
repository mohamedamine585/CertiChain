/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Github, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
//import useAuthStore from "@/store/authStore";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  //const { register, error, setErrorMessage } = useAuthStore();
  const [error, setErrorMessage] =useState(null);

  useEffect(() => {
    setErrorMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    firstname: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(3, {
        message: "First name must be at least 3 characters",
      })
      .max(40, {
        message: "First name must be at most 40 characters",
      }),
    lastname: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(3, {
        message: "Last name must be at least 3 characters",
      })
      .max(40, {
        message: "Last name must be at most 40 characters",
      }),
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
      })
      .max(40, {
        message: "Password must be at most 40 characters",
      }),
    phone: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be a string",
      })
      .min(10, {
        message: "Phone must be at least 10 characters",
      })
      .max(15, {
        message: "Phone must be at most 15 characters",
      }),
    userType: z.string({
      required_error: "User type is required",
    }),
    certificateName: z
      .string({
        required_error: "Certificate name is required",
        invalid_type_error: "Certificate name must be a string",
      })
      .min(3, {
        message: "Certificate name must be at least 3 characters",
      }),
    certificateType: z.string({
      required_error: "Certificate type is required",
    }),
    country: z
      .string({
        required_error: "Country is required",
        invalid_type_error: "Country must be a string",
      })
      .min(2, {
        message: "Country must be at least 2 characters",
      }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      userType: "individual",
      certificateName: "",
      certificateType: "private",
      country: "",
    },
  });
  
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.firstname, values.lastname, values.email, values.password);
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-max">
        <div className="flex flex-col space-y-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-foreground">
            Create an account
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
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-foreground" htmlFor="first-name">
                      First name
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-foreground w-full"
                      placeholder="Mohamed"
                      required
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-foreground" htmlFor="last-name">
                      Last name
                    </FormLabel>
                    <Input
                      {...field}
                      className="text-foreground w-full"
                      placeholder="Benadballah"
                      required
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="email">
                    Email
                  </FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    placeholder="m@example.com"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    className="absolute outline-none cursor-pointer top-[32px] right-4"
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="phone">
                    Phone
                  </FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    placeholder="1234567890"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="userType">
                    User Type
                  </FormLabel>
                  <select {...field} className="text-foreground w-full">
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="educational">Educational Institution</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificateName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="certificateName">
                    Certificate Name
                  </FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    placeholder="Certificate Name"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certificateType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="certificateType">
                    Certificate Type
                  </FormLabel>
                  <div className="flex items-center space-x-2">
                    <RadioGroup defaultValue={field.value} onValueChange={field.onChange} className="flex">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private</Label>
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public</Label>
                    </RadioGroup>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-foreground" htmlFor="country">
                    Country
                  </FormLabel>
                  <Input
                    {...field}
                    className="text-foreground w-full"
                    placeholder="Country"
                    required
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create an account
            </Button>
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
          </form>
        </Form>
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

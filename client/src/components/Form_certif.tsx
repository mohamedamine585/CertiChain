import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  recipientName: z.string().nonempty({ message: 'Recipient name is required' }),
  recipientEmail: z.string().email({ message: 'Invalid email format' }),
  recipientPhoto: z.string().url({ message: 'Invalid photo URL' }),
  certUrl: z.string().url({ message: 'Invalid certificate URL' }),
  certificateId: z.string().nonempty({ message: 'Certificate ID is required' }),
  issueDate: z.string().nonempty({ message: 'Issue date is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
});

export default function FormCertif() {
  const [error, setErrorMessage] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      recipientEmail: '',
      recipientPhoto: '',
      certUrl: '',
      certificateId: '',
      issueDate: '',
      description: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    console.log("Address: 0x8d8dbccab106d51cfb2ae5dbbdee288f56a2efc70f916c2c533abe73f5ad28c8");
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-max">
        <div className="flex flex-col space-y-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight dark:text-foreground">
            Certificate Form
          </h1>
        </div>
        {error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Grid Layout for Two Columns */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <Input {...field} placeholder="Recipient Name" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Email</FormLabel>
                    <Input {...field} placeholder="Recipient Email" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipientPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Photo URL</FormLabel>
                    <Input {...field} placeholder="Recipient Photo URL" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate URL</FormLabel>
                    <Input {...field} placeholder="Certificate URL" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certificateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate ID</FormLabel>
                    <Input {...field} placeholder="Certificate ID" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <Input {...field} placeholder="Issue Date" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Input {...field} placeholder="Description" required />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-foreground">
              <FormLabel>Address</FormLabel>
              <Input 
                value="0x8d8dbccab106d51cfb2ae5dbbdee288f56a2efc70f916c2c533abe73f5ad28c8" 
                readOnly 
                disabled 
              />
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

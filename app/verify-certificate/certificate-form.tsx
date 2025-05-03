"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  certificateNumber: z.string().min(6, {
    message: "Certificate number must be at least 6 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  fatherName: z.string().min(2, {
    message: "Father's name must be at least 2 characters.",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
});

type VerificationResult = {
  isValid: boolean;
  studentDetails?: {
    fullName: string;
    fatherName: string;
    dateOfBirth: string;
    course: string;
    issueDate: string;
    grade: string;
  };
  message: string;
};

export function CertificateVerificationForm() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificateNumber: searchParams.get("number") || "",
      fullName: "",
      fatherName: "",
    },
  });

  // Auto-verify if certificate number is provided via QR code
  useEffect(() => {
    const certificateNumber = searchParams.get("number");
    if (certificateNumber && !verificationResult) {
      form.setValue("certificateNumber", certificateNumber);
      toast.info("Certificate number detected from QR code");
    }
  }, [searchParams, form, verificationResult]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await fetch("/api/verify-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          dateOfBirth: format(values.dateOfBirth, "yyyy-MM-dd"),
        }),
      });

      if (!response.ok) {
        throw new Error("Verification request failed");
      }

      const result = await response.json();
      setVerificationResult(result);

      if (result.isValid) {
        toast.success("Certificate verified successfully!");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred during verification");
      setVerificationResult({
        isValid: false,
        message: "An error occurred during verification. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="certificateNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter certificate number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name as on certificate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father&apos;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter father&apos;s name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isVerifying}>
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Certificate"
            )}
          </Button>
        </form>
      </Form>

      {verificationResult && (
        <Alert variant={verificationResult.isValid ? "default" : "destructive"}>
          <AlertTitle>
            {verificationResult.isValid ? "Certificate Verified" : "Verification Failed"}
          </AlertTitle>
          <AlertDescription>
            {verificationResult.isValid && verificationResult.studentDetails ? (
              <div className="mt-2 space-y-2">
                <p><strong>Student Name:</strong> {verificationResult.studentDetails.fullName}</p>
                <p><strong>Course:</strong> {verificationResult.studentDetails.course}</p>
                <p><strong>Issue Date:</strong> {format(new Date(verificationResult.studentDetails.issueDate), "PPP")}</p>
                <p><strong>Grade:</strong> {verificationResult.studentDetails.grade}</p>
              </div>
            ) : (
              verificationResult.message
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 
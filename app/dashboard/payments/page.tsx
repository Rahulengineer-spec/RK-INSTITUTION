"use client"

import { useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Payment {
  id: string
  amount: number
  status: string
  payment_date: string
}

export default function PaymentsPage() {
  const { supabase, session } = useSupabase()
  const [loading, setLoading] = useState(false)

  const handlePayment = async (amount: number) => {
    try {
      setLoading(true)
      const stripe = await stripePromise

      if (!stripe || !session?.user.id) return

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })

      const { clientSecret } = await response.json()

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            token: "tok_visa", // Test token
          },
        },
      })

      if (result.error) {
        toast({
          title: "Payment failed",
          description: result.error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Payment successful",
          description: "Your payment has been processed successfully.",
        })

        // Update payment record in Supabase
        await supabase.from("payments").insert({
          student_id: session.user.id,
          amount,
          status: "paid",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Fee Payment</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tuition Fee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$1000</div>
            <Button
              onClick={() => handlePayment(1000)}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lab Fee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$500</div>
            <Button
              onClick={() => handlePayment(500)}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Library Fee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">$200</div>
            <Button
              onClick={() => handlePayment(200)}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
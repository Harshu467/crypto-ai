import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.error({
        status: 405,
        success: false,
        message: "Method Not Allowed",
        body: "Method Not Allowed",
      });
    }
    const requestBody = await request.json();
    const amount = Math.round(requestBody.amount * 100);
    const currency = requestBody.currency; // Method Not Allowed
    console.log("Amount", requestBody);
    const line_items = requestBody.line_items.map((item) => {
      console.log("Item", item);
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item.id,
            },
          },
          unit_amount: Math.round(item.current_price * 100),
        },
        quantity: item.quantity,
      };
    });
    try {

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      console.log("Session", session.url);
      return NextResponse.json({
        success: true,
        url: session.url,
        message: `Payment of ${amount} ${currency} successful`,
        amount: amount,
        currency: currency,
      });
    } catch (error) {
      console.log("Error in Stripe", error);
      return NextResponse.error({
        status: 500,
        message: error.message,
        body: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log("Error in Stripe", error);
    return NextResponse.error({
      status: 500,
      message: error.message,
      body: "Internal Server Error",
    });
  }
}

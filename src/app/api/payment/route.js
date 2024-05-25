import { NextResponse } from "next/server";
export const runtime = "edge";
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
    const email = requestBody.email;
    const currency = requestBody.currency; // Method Not Allowed
    const uid = requestBody.uid;
    //console.log("Amount", requestBody);
    const line_items = requestBody.line_items.map((item) => {
      console.log("Item", item);
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item?.id,
              coinImage: item?.image,
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
        metadata: {
          uid: uid,
          email: email,
          currency: currency,
          coinImage: line_items[0].price_data.product_data.metadata.coinImage,
        },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${uid}?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${uid}?success=false`,
      });
      //console.log("Session", session.url);
      return NextResponse.json({
        success: true,
        url: session.url,
        message: `Payment of ${amount} ${currency} successful`,
        amount: amount,
        currency: currency,
      });
    } catch (error) {
      //console.log("Error in Stripe2", error);
      return NextResponse.error({
        status: 600,
        message: error,
        body: "Internal Server Error",
      });
    }
  } catch (error) {
    //console.log("Error in Stripe", error);
    return NextResponse.error({
      status: 500,
      message: error.message,
      body: "Internal Server Error",
    });
  }
}

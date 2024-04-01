import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export const runtime = "edge";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});
export async function POST(request) {
  console.log("Webhook received");
  const body = await request.text();
  const signature = await headers().get("Stripe-Signature") ?? "";
  console.log("Signature", signature);
  console.log("Body", body);
  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
    console.log("Event", event);
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  const session = event.data.object;

  if (!session?.metadata?.userId) {
    console.error("No user ID in metadata");
    NextResponse.json({ error: "No user ID in metadata" }, { status: 400 });
  }
  if (event.type === "payment_intent.succeeded") {
    console.log("Updating user subscription details");
    NextResponse.json({ message: "Payment intent succeeded",status: 200});
  }
  if (event.type === "payment_intent.payment_failed") {
    console.log("Updating user subscription details");
    NextResponse.json({ message: "Payment intent failed",status: 400});
  }
  if (event.type === "payment_intent.canceled") {
    console.log("Updating user subscription details");
    NextResponse.json({ message: "Payment intent canceled",status: 400});
  }
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );
    console.log("Updating user subscription details");
    NextResponse.json({ message: "Checkout session completed",status: 200});
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    // Update the price id and set the new period end.
    console.log("Updating user subscription details");
    NextResponse.json({ message: "Invoice payment succeeded",status: 200});
  }
  NextResponse.json({ message: "Unhandled event",status: 400});
}

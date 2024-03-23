import { stripe } from "@utils/stripe";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  unstable_allowDynamic: ["**/node_modules/function-bind/**"],
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  const body = await (await req.blob()).text();
  const sig = req.headers.get("stripe-signature");
  if (req.method === "POST") {
    let event;
    try {
        event = stripe.webhooks.constructEventAsync(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        // Handle the event
        switch (event.type) {
          case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log("PaymentIntent was successful!");
            break;
          case "payment_intent.payment_failed":
            const paymentFailed = event.data.object;
            console.log("PaymentIntent was failed!");
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
      console.log("Error in Stripe", error);
      return NextResponse.error({
        status: 600,
        message: error,
        body: "Internal Server Error",
      });
    }
  }
};

export default webhookHandler;
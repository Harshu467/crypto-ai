import { stripe } from "@utils/stripe";
import { NextResponse } from "next/server";
import getRawBody from "raw-body";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2020-08-27",
// });
export const config = {
  runtime: "edge",
  unstable_allowDynamic: ["**/node_modules/function-bind/**"],
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req, res) => {
  console.log("Webhook called", req);
  const sig = req.headers.get("stripe-signature");
  if (req.method === "POST") {
    const rawBody = await getRawBody(req);
    let event;
    try {
      event = stripe.webhooks.constructEventAsync(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("Event", event);
      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log("PaymentIntent was successful!");
          return NextResponse.json({
            status: 200,
            message: "PaymentIntent was successful",
            body: "OK",
          });
          break;
        case "payment_intent.payment_failed":
          const paymentFailed = event.data.object;
          //console.log("PaymentIntent was failed!");
          return NextResponse.error({
            status: 400,
            message: "PaymentIntent was failed",
            body: "Bad Request",
          });
          break;
        case "checkout.session.completed":
          const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
              expand: ["line_items"],
            }
          );
          const lineItems = session.line_items;
          if(!lineItems){
            return NextResponse.error({
              status: 500,
              message: "No line items found",
              body: "Bad Request",
            });
          }
          if (session.payment_status === "paid") {
            console.log("Payment was successful!");
          }
          //console.log("Checkout session completed!");
          break;
        default:
          //console.log(`Unhandled event type ${event.type}`);
          return NextResponse.error({
            status: 400,
            message: "Unhandled event type",
            body: "Bad Request",
          });
      }
    } catch (error) {
      //console.log("Error in Stripe", error);
      return NextResponse.error({
        status: 600,
        message: error,
        body: "Internal Server Error",
      });
    }
  } else if (req.method !== "POST") {
    return NextResponse.error({
      status: 400,
      message: "Method not allowed",
      body: "Bad Request",
    });
  }
};

export default webhookHandler;

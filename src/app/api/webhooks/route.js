import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export const runtime = "edge";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});
export async function POST(request) {
  if (request.method === "POST") {
    // console.log("Webhook received");
    const body = await request.text();
    const signature = (await headers().get("Stripe-Signature")) ?? "";
    // console.log("Signature", signature);
    // console.log("Body", body);
    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );
      // console.log("Event", event);
    } catch (err) {
      return new Response(
        `Webhook Error: ${
          err instanceof Error ? err.message : "Unknown Error"
        }`,
        { status: 400, msg: `${signature}` }
      );
    }

    const session = event.data.object;
    console.log("Session", session);
    // if (!session?.metadata?.userId) {
    //   console.error("No user ID in metadata");
    //   return new Response(`No user ID in metadata ${session.metadata.userId}`, {
    //     status: 400,
    //   });
    // }
    if (event.type === "checkout.session.completed") {
      console.log("Updating user subscription details");
      const SessionId = session.id;
      const email = session.metadata.email;
      const uid = session.metadata.uid;
      const payment_status = session.payment_status;
      const totalAmount = session.amount_total;
      const lineItems = await stripe.checkout.sessions.listLineItems(SessionId);
      if(payment_status === "paid" && uid && email && lineItems){
        const response = await fetch(
          "https://jkykdc3j7r6j7oaka2plv5qcbu0phnla.lambda-url.ap-south-1.on.aws/",
          {
            method: "POST",
            body: JSON.stringify(
                {
                    email: email,
                    uid: uid,
                    lineItems: lineItems,
                    totalAmount: totalAmount,
                }
            ),
          }
        )
        console.log("Response", response);
        return new Response(
          `Checkout session completed for ${session.customer_details.name} with Email : ${email} with Response : ${response} `,
          { status: 200 }
        );
      }
      return new Response(
        `Checkout session completed but Something is Missing `,
        { status: 200 }
      );
    }
    if (event.type === "checkout.session.expired") {
      console.log("Updating user subscription details");
      return new Response(
        `Checkout session expired ${JSON.stringify(session)} `,
        { status: 200 }
      );
    }
    if (event.type === "payment_intent.created") {
      console.log("Updating user subscription details");
      return new Response(
        `Payment intent created with email ${JSON.stringify(
          session
        )} and ${JSON.stringify(event)}  `,
        {
          status: 200,
          email: session.metadata.email,
          email1: event.data.object.customer_email,
        }
      );
    }
    if (event.type === "payment_intent.processing") {
      console.log("Updating user subscription details");
      return new Response(`Payment intent processing`, { status: 200 });
    }
    if (event.type === "payment_intent.succeeded") {
      console.log("Updating user subscription details");
      return new Response(`Payment intent succeeded `, { status: 200 });
    }
    if (event.type === "payment_intent.payment_failed") {
      console.log("Updating user subscription details");
      return new Response(`Payment Intent Failed`, { status: 400 });
    }
    if (event.type === "payment_intent.canceled") {
      console.log("Updating user subscription details");
      return new Response(`Payment Intent Canceled`, { status: 400 });
    }
  } else {
    console.log("Unhandled event");
    return new Response(`Unhandled Event`, { status: 400 });
  }
  return new Response(`Unhandled event`, { status: 400 });
}

lineItems = {
  object: "list",
  data: [
    {
      id: "li_1P2VjiI2i0Gg9RKuzVE7BOQt",
      object: "item",
      amount_discount: 0,
      amount_subtotal: 333007,
      amount_tax: 0,
      amount_total: 333007,
      currency: "usd",
      description: "Lido Staked Ether",
      price: {
        id: "price_1P2VjiI2i0Gg9RKuorwSwx4e",
        object: "price",
        active: false,
        billing_scheme: "per_unit",
        created: 1712396434,
        currency: "usd",
        custom_unit_amount: null,
        livemode: false,
        lookup_key: null,
        metadata: {},
        nickname: null,
        product: "prod_PgiZQrRzwLfzSN",
        recurring: null,
        tax_behavior: "unspecified",
        tiers_mode: null,
        transform_quantity: null,
        type: "one_time",
        unit_amount: 333007,
        unit_amount_decimal: "333007",
      },
      quantity: 1,
    },
  ],
  has_more: false,
  url: "/v1/checkout/sessions/cs_test_a1mU0CMlA273sTTmNlg7eZo46eu7j38bJn2k6tDw6nNoQgSgJwfyeFYZs1/line_items",
};

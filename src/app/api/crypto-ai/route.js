import { NextResponse } from "next/server";

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
    const coinId = requestBody.coinId;
    const message = requestBody.message;
    const uid = requestBody.uid;
    const currency = requestBody.currency;
    const token = requestBody.token;
    console.log("Crypto AI", requestBody);
    let toke =
      process.env.OPENAI_API_KEY ||
      "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";
    console.log("TOKE", toke);
    const response = await fetch(
      "https://ui5uvjekg1.execute-api.ap-south-1.amazonaws.com/Prod/hello/",
      {
        method: "POST",
        body: JSON.stringify(
            {
                message: message,
                currency: currency,
                coinId: coinId,
                uid: uid,
            }
        ),
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   Authorization: `AuthToken ${token} `,
        // },
      }
    );
    const data = await response.json();
    console.log("FROM LURL", data);
    return NextResponse.json({
      success: true,
      message: "Message Sent",
      status: 200,
    });
  } catch (error) {
    console.log("Error in Crypto AI", error);
    return NextResponse.error({
      status: 500,
      message:"Internal Server Error" ,
      success: false,
    });
  }
}

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
    //console.log("Crypto AI", requestBody);
    let toke =
      process.env.OPENAI_API_KEY ;
    //console.log("TOKE", toke);
    const response = await fetch(
      "https://lag34l4tb7ksrybvte6ufukhpq0sdjvc.lambda-url.ap-south-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify(
            {
                message: message,
                currency: currency,
                coin: coinId,
                uid: uid,
            }
        ),
      }
    );
    const data = await response.json();
    //console.log("FROM LURL", data,data.data.choices[0].message.content);
    return NextResponse.json({
      success: true,
      message: data,
      status: 200,
    });
  } catch (error) {
    //console.log("Error in Crypto AI", error);
    return NextResponse.error({
      status: 500,
      message:"Internal Server Error" ,
      success: false,
    });
  }
}

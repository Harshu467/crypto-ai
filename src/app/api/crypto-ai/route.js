import { NextResponse } from "next/server";
const CONVERSE_LAYER =
  // "https://y4sxeg4tjpg3ltkwj7hzv5qrfu0xglpq.lambda-url.ap-south-1.on.aws/";
"https://hwj5d7n4usoyhh65pel5jwix340kndac.lambda-url.ap-south-1.on.aws/";
export const runtime = "edge";
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
    // console.log("Request Body", requestBody)
    const coinId = requestBody.coinId;
    const message = requestBody.message;
    const uid = requestBody.uid;
    const currency = requestBody.currency;
    // const token = requestBody.token;
    const tone = requestBody.tone;
    const language = requestBody.language;
    // console.log("TONE", tone);
    // console.log("LANGUAGE", language);
    //console.log("Crypto AI", requestBody);
    // let toke = process.env.OPENAI_API_KEY;
    //console.log("TOKE", toke);
    const response = await fetch(CONVERSE_LAYER, {
      method: "POST",
      body: JSON.stringify({
        message: message,
        currency: currency,
        coin: coinId,
        uid: uid,
        tone: tone,
        language: language,
      }),
    });
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
      message: "Internal Server Error",
      success: false,
    });
  }
}

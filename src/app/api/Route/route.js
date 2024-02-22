import { NextRequest, NextResponse } from "next/server";
export async function POST(req, res, next) {
    try {
        
    } catch (error) {
     console.log("ERROR",error)   
     return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
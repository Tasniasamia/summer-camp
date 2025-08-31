import { failedSSLcommerze } from "@/lib/controllers/payment/ssl_commerze/failed";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
  try{
    const data=await failedSSLcommerze(req);
    return new Response.redirect(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}
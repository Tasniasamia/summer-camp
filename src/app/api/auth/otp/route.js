import { sendOtp } from "@/lib/controllers/auth/otpController";
import { handleError } from "@/lib/helpers/errorHandler"
import { NextResponse } from "next/server";

export const POST=async(req)=>{
   try{
      const res=await sendOtp(req);
      return new Response(res);
   }
   catch(e){
      return handleError(NextResponse,e,500);

   }
}
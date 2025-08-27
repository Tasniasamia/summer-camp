import prisma from "@/lib/db";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const sendOtp = async (req) => {
  let otp = Math.floor(100000 + Math.random() * 900000);
  const { email, action } = await req.json();
  if (action === "registration") {
    const findUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!findUser) {
      return (
        JSON.stringify({
          success: true,
          otp: otp,
          msg: `Please Check your ${action}`,
          status:200
        })
        
      );
    }
    return (
      JSON.stringify({ success: false, msg: `Email already exist` ,status:400})
      
    );
  }
};

import { createToken } from "@/app/api/user/route";
import prisma from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/helpers/hashing";

export const login = async (req) => {
  try {
    const { password, email } = await req.json();
    const findUser = await prisma.user.findUnique({ where: { email: email } });
    const verifyPassword = await comparePassword(password, findUser?.password);
    if (findUser && verifyPassword) {
      return {
        success: true,
        data: { token: createToken({ email: email }) },
        msg: "Login Successfully",
        status: 200,
      };
    } else {
      return { success: false, msg: "User not found", status: 400 };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 200 };
  }
};

export const register = async (req) => {
  try {
    const { email, password, name, role, otp, action } = await req.json();

    // Required field check
    if (!email || !password || !name || !role || !otp || !action) {
      return ({ success: false, msg: "All fields are required", status: 400 });
    }

    // Duplicate user check
    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      return ({ success: false, msg: "Email already exists", status: 400 });
    }
    const findOtp = await prisma.otp.findFirst({ where: { email, otp, action } });
    if (!findOtp) {
      return ({ success: false, msg: "Invalid OTP", status: 400 });
    }
    console.log("findOtp",findOtp);

    const hashedPassword = await hashPassword(password);
    const createUser = await prisma.user.create({
      data: { email, password: hashedPassword, role, name },
    });
    console.log("createuser",createUser);
    await prisma.otp.delete({ where: { id: findOtp.id } });
    return ({
      success: true,
      data: createUser,
      msg: "User Registered Successfully",
      status: 201,
    });
  } catch (e) {
    return ({ success: false, msg: e.message, status: 500 });
  }
};


import { createToken } from "@/app/api/user/route";
import prisma from "@/lib/db";
import { comparePassword } from "@/lib/helpers/hashing";

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

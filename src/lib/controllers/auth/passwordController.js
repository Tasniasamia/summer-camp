import prisma from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/helpers/hashing";

export const forget_password = async (req) => {
  try {
    const { email, password, otp } = await req.json();
    if (password && email && otp) {
      const { id } = await prisma.otp.findFirst({ where: { otp: otp } });
      await prisma.otp.update({
        where: { id: parseInt(id) },
        data: { isVerify: true },
      });

      const convertPassword = await hashPassword(password);
      const findUser = await prisma.user.findUnique({
        where: { email: email },
      });
      if (findUser) {
        const updatePassword = await prisma.user.update({
          where: { email: email },
          data: { password: convertPassword },
        });
        return {
          success: true,
          msg: "Password Update Successfully",
          data: updatePassword,
          status: 200,
        };
      } else {
        return { success: false, msg: "User not found", status: 400 };
      }
    }
  } catch (e) {
    return { success: false, msg: e.message, status: 400 };
  }
};

import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();
export const GET = async (request) => {
  try {
    const data = await request.json();
    if (data?.userId) {
      const { userId } = data;
      const findData = await prisma.enrollClass.findMany({
        where: { userId: userId },
      });

      return new Response(JSON.stringify(findData), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};

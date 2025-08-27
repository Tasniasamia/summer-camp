import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);

    const idParam = searchParams.get("id");
    const userId = idParam ? parseInt(idParam, 10) : undefined;

    const search = searchParams.get("search");
    const findSearch = search ? { status: search } : {};

    const whereClause = {
      ...(userId ? { userId } : {}),
      ...findSearch,
    };

    const findData = await prisma.enrollClass.findMany({
      where: whereClause,
      include: {
        class: {
          select: {
            name: true,
            price: true,
            image: true,
            status: true,
            category: true,
            instructor: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(findData), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      { status: 500 }
    );
  }
};

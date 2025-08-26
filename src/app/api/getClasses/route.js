import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();
export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        // pagination
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search=searchParams.get("search");
        const skip = (page - 1) * limit;
        const findSearch = search
        ? { name: { contains: search } }
        : {};
        const [docs, totalDocs] = await Promise.all([
          prisma.class.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" }, 
            where:findSearch
          }),
          prisma.class.count(),
        ]);
  
        const totalPages = Math.ceil(totalDocs / limit);
  
        const responseData = {
          success: true,
          statusCode: 200,
          message: "Classes fetched successfully",
          data: {
            docs,
            totalDocs,
            limit,
            page,
            totalPages,
            pagingCounter: skip + 1,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
          },
        };
  
        return new Response(JSON.stringify(responseData), { status: 200 });
      
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
  };
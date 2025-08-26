import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export const POST=async(request)=>{
    try{
        const data = await request.json();
        console.log("requestdata",data);
        if(!data){
            return new Response ({status:400, error:"No Content"})
        }
        const result=await prisma.class.create({
            data:data
        })

        return new Response(JSON.stringify({data:result,success:true}),{status:200})
    }
    catch(err){
        return new Response(JSON.stringify({ error: err.message,msg:err.message ,success:false }),{status:404})
    }

}


export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
 
    if (id) {
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(id) },
      });
     console.log("classdata",classData);
      if (!classData) {
        return new Response(
          JSON.stringify({ error: "Class not found" }),
          { status: 404 }
        );
      }

      return new Response(JSON.stringify(classData), { status: 200 });
    } else {
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
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};




export const PUT = async (request) => {
  try {
    const data = await request.json();

    if (!data?.id) {
      return new Response(JSON.stringify({ error: 'Class id is required for Update' }), { status: 400 });
    }

    const classId = parseInt(data.id);

    const { id, ...updateData } = data;

    const updatedClass = await prisma.class.update({
      where: { id: classId },
      data: updateData,
    });

    return new Response(JSON.stringify({ success: true, class: updatedClass }), { status: 200 });
  } catch (err) {
    console.error(err);

    if (err.code === 'P2025') {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};


export async function DELETE(request) {
  try {
    const body = await request.json();
    console.log("body delete", body);

    const id = body?.id;
    console.log("id body", id);

    if (!id) {
      return new Response(
        JSON.stringify({ error: "User id is required for delete" }),
        { status: 400 }
      );
    }

    const deletedUser = await prisma.class.delete({
      where: { id: parseInt(id) },
    });

    console.log("deleted User", deletedUser);

    return new Response(
      JSON.stringify({
        message: "Class deleted Successfully",
        user: deletedUser,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete Error:", error);

    if (error?.code === "P2025") {
      return new Response(JSON.stringify({ error: "Class not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500 }
    );
  }
}

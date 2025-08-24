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


export const GET=async(request)=>{
    try{
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
     if (id) {
        const  classData= await prisma.class.findUnique({
          where: { id:parseInt(id) },
        });
      if (!classData) {
          return new Response(
            JSON.stringify({ error: "Class not found" }),
            { status: 404 }
          );
        }
      return new Response(JSON.stringify(classData), { status: 200 });
      } else {
        const users = await prisma.class.findMany();
        return new Response(JSON.stringify(users), { status: 200 });
      }
    }
    catch(err){
        return new Response(JSON.stringify({ error: err.message }),{status:404})
    }
}



export const PUT=async(request)=>{
    try{
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const data=await request.json();
        if (!id) {
            return new Response(JSON.stringify({ error: 'User id is required for Update' }), { status: 400 });
          }
        if(id){
            const  updateClass= await prisma.class.update({
                where: { id:parseInt(id)},
                data:data
              });
              if (!updateClass) {
                return new Response(
                  JSON.stringify({ error: "Class not found" }),
                  { status: 404 }
                );
              }
              return new Response(JSON.stringify(updateClass), { status: 200 });

        }
    
    }
    catch(err){
     return   new Response(JSON.stringify({error:err.message}),{status:404})
    }
}

export async function DELETE(request) {
    try {
      const url = new URL(request.url);
      let id = url.searchParams.get('id');
  
      if (!id) {
        const body = await request.json();
        id = body.id;
      }
  
      if (!id) {
        return new Response(JSON.stringify({ error: 'User id is required for delete' }), { status: 400 });
      }
  
      const deletedUser = await prisma.class.delete({
        where: { id: parseInt(id) },
      });
  
      return new Response(JSON.stringify({ message: 'Class deleted SuccessFully', user: deletedUser }), { status: 200 });
    } catch (error) {
      if (error.code === 'P2025') {
        return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  
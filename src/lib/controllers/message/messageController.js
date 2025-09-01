import prisma from "@/lib/db";

export const postMessage=async(req)=>{
    try{
        const data=await req.json();
        if(data){
           const createMessage= await prisma.message.create({data:data});
           if(createMessage){
            return {
                status:200,
                msg:"Message send successfully",
                success:true
            }
           }
        }
    }
    catch (e) {
        return { status: 500, success: false, msg: e?.message };
      }
}


export const getMessage = async (req) => {
    try {
      const url = new URL(req.url);
      const user1 = parseInt(url.searchParams.get("user1") || "");
      const user2 = parseInt(url.searchParams.get("user2") || "");
  
      if (!user1) {
        return { status: 400, msg: "User Id is required", success: false };
      }
  
      const findMessages = await prisma.message.findMany({
        where: {
          OR: [
            { sender: user1, receiver: user2 },
            { sender: user2, receiver: user1 },
          ],
        },
        orderBy: { id: "asc" }, 
      });
  
      return { status: 200, success: true, data: findMessages };
    } catch (e) {
      return { status: 500, success: false, msg: e?.message };
    }
  };
  
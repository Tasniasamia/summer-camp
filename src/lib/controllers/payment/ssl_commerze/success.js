import prisma from "@/lib/db";

export const successSSLcommerze=async(req)=>{
    try{
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");
    const classId = formData.get("value_a") ;
    const useId = formData.get("value_b");
    const findClass=await prisma.class.findUnique({
      where:{id:parseInt(classId)}
    });
    if(findClass){
      const updateClass=await prisma.class.update({
        where:{id:parseInt(classId)},
        data:{sit:findClass?.sit - 1,enrollment:findClass?.enrollment+1}

      })
    }
    if (tran_id) {
      try {
        await fetch(`http://localhost:3000/api/enroll`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "paid", transactionId: tran_id }),
        });
      } catch (err) {
        console.error("Error updating enrollClass:", err);
        
      }
    }
    return (`http://localhost:3000/payment/success?tran_id=${tran_id}&amount=${amount}&currency=${currency}`);
}
catch(e){
    return {msg:e?.message,success:false,status:500}
}
}
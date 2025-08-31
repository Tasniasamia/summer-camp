import prisma from "@/lib/db";

export const enrollClass=async(req)=>{
    try{
        const body = await req.json();
        const { classId, userId } = body;
        const findUser=await prisma.user.findUnique({where:{id:userId}})
        if(findUser?.role==="student"){
        const classData = await prisma.class.findUnique({
          where: { id: parseInt(classId) },
        });
        const userData = await prisma.user.findUnique({
          where: { id: parseInt(userId) },
        });
        const enrolledUser = await prisma.enrollClass.findFirst({
          where: {
            userId: userId,
            classId: classId,
            status: "paid"
          }
        });
        if(enrolledUser){
          return {error:"Already Enrolled",success:false,status:400}
        }
        let transaction = `tran_${Date.now()}`;
        const data = {
          store_id: process.env.STORE_ID,
          store_passwd: process.env.STORE_PASSWORD,
          total_amount: classData?.price,
          currency: "BDT",
          tran_id: transaction, // unique
          success_url: `http://localhost:3000/api/payment/success`,
          fail_url: `http://localhost:3000/api/payment/fail`,
          cancel_url: `http://localhost:3000/api/payment/cancel`,
          cus_name: userData?.name,
          cus_email: userData?.email,
          cus_add1: userData?.address || "Dhaka",
          cus_phone: userData?.phone_number || "01921",
          cus_country: "Bangladesh",
          cus_city: "Dhaka",
          shipping_method: "NO",
          product_name: "Test Product",
          product_category: "General",
          product_profile: "general",
          status: "pending",
          value_a: classId,
          value_b: userId,
        };
       const response = await fetch(
          "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data),
          }
        );
        const result = await response.json();
        if (result.status === "SUCCESS") {
          const addEnroll = await prisma.enrollClass.create({
            data: {
              name: userData?.name,
              classId: classId,
              userId: userId,
              status: "pending",
              transactionId: transaction,
            },
          });
      
          return ({ GatewayPageURL: result.GatewayPageURL ,success:true});
        } else {
          return {success:false, msg: "Payment initiation failed", data:result , status: 400 }
         }
        }
        else{
          return {success:false,msg:"Only student can enroll",status:400}
        }
      }
      catch(e){
        return {success:false,msg:e?.message,status:500}
      }
}

export const updateEnrollClass=async(req)=>{
    try {
        const data = await req.json();
        const { id, classId, userId, status, transactionId } = data;
        if (id || transactionId) {
          if (transactionId) {
            const updateData = await prisma.enrollClass.update({
              where: { transactionId: transactionId },
              data: { status: status, transactionId: transactionId },
            });
            return { data: updateData ,success:true,status: 200,msg:"Data updated successfully" }
            
          } else if (id) {
            const updateData = await prisma.enrollClass.update({
              where: { id: id },
              data: data,
            });
            return { data: updateData ,success:true, status: 200 }
            
          } else {
            return { msg: "Id or transactionId is required" ,success:false, status: 400 }
            
          }
        }
      } catch (err) {
        return {success:false,msg:err?.message,status:500}

      }
}

export const getEnrollClass=async(req)=>{
    try {
        const searchParams = new URL(req.URL);
        const id = searchParams.get("id");
        if (!id) {
          return { msg: "Id is required" ,success:false,
            status: 400,
          }
        }
        if (id) {
          const data = await prisma.enrollClass.findUnique({ where: { id: id } });
          return { data: data ,msg:"Enrolled Successfully", success:true,status: 200 };
        }
        const data = await prisma.enrollClass.findMany({});
        return { data: data ,success:true,msg:"" , status: 200 };
      } catch (err) {
        return {success:false,msg:err?.message,status:500}

      }
}
export const getEnrolledClass=async(req)=>{
  try {
    const { searchParams } = new URL(req.url);

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

    return ({data:findData,success:true, status: 200 });
  } catch (err) {
    return {success:false,msg:err?.message,status:500}

  }
}
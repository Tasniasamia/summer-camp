import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();

    const {  classId, userId } = body;
    const  classData= await prisma.class.findUnique({
        where: { id:parseInt(classId) },
      });
      const  userData= await prisma.user.findUnique({
        where: { id:parseInt(userId) },
      });
      console.log("userdata",userData);
      console.log("classdata",classData);
   let transaction=`tran_${Date.now()}`;
    const data = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASSWORD,
      total_amount: classData?.price,
      currency: 'BDT',
      tran_id:transaction, // unique
      success_url: `http://localhost:3000/api/payment/success`,
      fail_url: `http://localhost:3000/api/payment/fail`,
      cancel_url: `http://localhost:3000/api/payment/cancel`,
      cus_name: userData?.name,
      cus_email: userData?.email,
      cus_add1: userData?.address || 'Dhaka',
      cus_phone: userData?.phone_number || '01921',
      cus_country:"Bangladesh",
      cus_city:"Dhaka",
      shipping_method: 'NO',
      product_name: 'Test Product',
      product_category: 'General',
      product_profile: 'general',
      status:"pending",
      class:classId,
      user:userId
    };
    Object.keys(data).forEach(key => {
      if (!data[key]) {
        console.warn(`⚠️ ${key} is empty`);
      }
    });
    
    const response = await fetch(
      'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data)
      }
    );
  
    const result = await response.json();
  
    if (result.status === 'SUCCESS') {
      const addEnroll=await prisma.enrollClass.create({
        data:{
          name:userData?.name,
          classId:classId,
          userId:userId,
          status:"pending",
          transactionId:transaction
        }
      })
       
      return Response.json({ GatewayPageURL: result.GatewayPageURL });
    } else {
      return Response.json(
        { message: 'Payment initiation failed', result },
        { status: 400 }
      );
    }
  }
  
  export async function PUT(req) {
    try{
      const data = await request.json();
      const { id, classId,userId,status, transactionId } = data;
      if(!transactionId){
        return new Response(JSON.stringify({error:"transactionId is required"}),{status:400});
      }
      const updateData=await prisma.enrollClass.update({
        where:transactionId,
        data:data
      })
      return new Response(JSON.stringify({data:updateData},{status:200}))
    }
    catch(err){
      return new Response(JSON.stringify({error:err.message}),{status:404});

    }
    
  }

  export async  function GET(req){

    try{
      const data=await prisma.enrollClass.findMany({});
      return new Response(JSON.stringify({data:data}),{status:200});
    }
    catch(err){
      return new Response(JSON.stringify({error:err.message}),{status:404});

    }
  }
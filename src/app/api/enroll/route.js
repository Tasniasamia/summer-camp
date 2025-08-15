import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { classId, userId } = body;
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
    return new Response(JSON.stringify({error:"Already Enrolled"},{status:400}))
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

    return Response.json({ GatewayPageURL: result.GatewayPageURL ,success:true});
  } else {
    return Response.json(
      { message: "Payment initiation failed", result },
      { status: 400 }
      
    );
  }
}

export async function PUT(req) {
  try {
    const data = await req.json();
    const { id, classId, userId, status, transactionId } = data;
    if (id || transactionId) {
      if (transactionId) {
        const updateData = await prisma.enrollClass.update({
          where: { transactionId: transactionId },
          data: { status: status, transactionId: transactionId },
        });
        return new Response(
          JSON.stringify({ data: updateData }, { status: 200 })
        );
      } else if (id) {
        const updateData = await prisma.enrollClass.update({
          where: { id: id },
          data: data,
        });
        return new Response(
          JSON.stringify({ data: updateData }, { status: 200 })
        );
      } else {
        return new Response(
          JSON.stringify({ erro: "Id or transactionId is required" }),
          { status: 400 }
        );
      }
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 404,
    });
  }
}

export async function GET(req) {
  try {
    const searchParams = new URL(req.URL);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Id is required" }), {
        status: 400,
      });
    }
    if (id) {
      const data = await prisma.enrollClass.findUnique({ where: { id: id } });
      return new Response(JSON.stringify({ data: data }), { status: 200 });
    }

    const data = await prisma.enrollClass.findMany({});
    return new Response(JSON.stringify({ data: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 404,
    });
  }
}

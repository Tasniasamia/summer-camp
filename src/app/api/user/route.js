

import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "mySecretKey"; 

export const createToken = (payload) => {
  // payload: { id, email, role }
  return jwt.sign(payload, secret);
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

// -------------------- API Methods --------------------
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No token provided" }), { status: 401 });
    }

    // Format: "Bearer <token>" → শুধু token অংশ নাও
    const token = authHeader.split(" ")[1];
    const payload=verifyToken(token);
    const user=await prisma.user.findUnique({ where: { email: payload?.email } }
    );
    if(user){
      return new Response(JSON.stringify({data:user,success:true,msg:"Get User Successfully"},{status:200}))
    }

    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password, address, phone_number, image, role, name } = data;
    const token = createToken({email:email,role:role});
    // আগেই user check করা (Firebase email verify হলে)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({user:existingUser, success:true,msg: "User already exists" ,token:token},{status:200})
      );
    }

    const newUser = await prisma.user.create({
      data: { email, password, address, phone_number, image, role, name },
    });

    // token create
  

    return new Response(JSON.stringify({ user: newUser, token,success:true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message ,success:false}), { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, email, password, address, phone_number, image, role, name } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: "User id is required" }), {
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, password, address, phone_number, image, role, name },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No token provided" }), { status: 401 });
    }

    // Format: "Bearer <token>" → শুধু token অংশ নাও
    const token = authHeader.split(" ")[1];
    const payload=verifyToken(token);
    if(payload?.role!=="admin"){
    return new Response(JSON.stringify({success:false,msg:"Only admin can delete user"}),{status:400})
    }
    const url = new URL(request.url);
    let id = url.searchParams.get("id");
    
    if (!id) {
      const body = await request.json();
      id = body.id;
    }

    if (!id) {
      return new Response(JSON.stringify({ error: "User id is required" }), {
        status: 400,
      });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: "User deleted", user: deletedUser }), { status: 200 });
  } catch (error) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

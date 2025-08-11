import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {

    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      console.log(searchParams?.get("email"));
      if (email) {
        const user = await prisma.user.findUnique({
          where: { email:email },
        });
  
        if (!user) {
          return new Response(
            JSON.stringify({ error: "User not found" }),
            { status: 404 }
          );
        }
  
        return new Response(JSON.stringify(user), { status: 200 });
      } else {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users), { status: 200 });
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }
  
export async function POST(request) {
  // Create new user
  console.log("Come to post function");
  try {
    const data = await request.json();

    const { email, password, address, phone_number, image, role,name } = data;
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        address,
        phone_number,
        image,
        role,
        name
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(request) {
  // Update user by id
  try {
    const data = await request.json();
    const { id, email, password, address, phone_number, image, role,name } = data;

    if (!id) {
      return new Response(JSON.stringify({ error: 'User id is required for update' }), { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password,
        address,
        phone_number,
        image,
        role,
        name
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    // handle user not found error
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  // Delete user by id from query param or body
  try {
    const url = new URL(request.url);
    let id = url.searchParams.get('id');

    if (!id) {
      // try from body
      const body = await request.json();
      id = body.id;
    }

    if (!id) {
      return new Response(JSON.stringify({ error: 'User id is required for delete' }), { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new Response(JSON.stringify({ message: 'User deleted', user: deletedUser }), { status: 200 });
  } catch (error) {
    if (error.code === 'P2025') {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postClassCategory = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 400 };
    }
    if (token) {
      const user = verifyToken(token);

      if (user?.role === "admin") {
        const { name, image } = await req.json();
        const findUnique = await prisma.category.findFirst({
          where: { name: name },
        });
        if (findUnique) {
          return { success: false, msg: "Category already exist", status: 400 };
        }
        const postCategory = await prisma.category.create({
          data: { name: name, image: image },
        });
        if (postCategory) {
          return {
            success: true,
            msg: "Category created successfully",
            status: 200,
          };
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const getAllCategory = async (req) => {
  try {
    const allCategory = await prisma.category.findMany({});
    if (allCategory) {
      return {
        success: true,
        data: allCategory,
        msg: "Get All Category Successfully",
        status: 200,
      };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const putClassCategory = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 400 };
    }
    if (token) {
      const user = verifyToken(token);
      const {id,name,image}=await req.json();
      if (user?.role === "admin") {
        const updateData = await prisma.category.update({
          where: { id: id },
          data: { name: name, image: image, id: id },
        });
        if (updateData) {
          return {
            success: true,
            msg: "Category updated successfully",
            status: 400,
          };
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

export const deleteCateogry = async (req) => {
  try {
    const header = await req.headers.get("authorization");
    const token = header.split(" ")[1];
    if (!token) {
      return { success: false, msg: "Unauthorized Access", status: 400 };
    }
    if (token) {
      const user = verifyToken(token);
      if (user?.role === "admin") {
        const { id } = await req.json();
        if (id) {
          const findData = await prisma.category.delete({ where: { id: id } });
          if (findData) {
            return {
              success: true,
              msg: "Category deleted successfully",
              status: 200,
            };
          }
        }
      }
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 500 };
  }
};

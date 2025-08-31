import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postPackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
        return { success: false, status: 401, msg: "Unauthorized access" };
      }
   const payload = verifyToken(token);
    if (payload?.role === "admin") {
      const data = await req.json();
      const findPackage=await prisma.package.findFirst({where:{name:data?.name}});
      if(findPackage){
        return {success:false,status:400,msg:"Package already created"}
      }
      const totalPackage = await prisma.package.count();
      if (totalPackage < 3) {
        const createPackage = await prisma.package.create({ data: data });
        if (createPackage) {
          return {
            success: true,
            status: 200,
            msg: "Package created successfully",
          };
        }
      } else {
        return {
          success: false,
          status: 400,
          msg: "You have already created 3 packages",
        };
      }
    } else {
      return {
        status: 400,
        success: false,
        msg: "Only admin can create package",
      };
    }
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const getPackage = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const findPackage = await prisma.package.findUnique({
        where: { id: parseInt(id) },
      });
      return { status: 200, success: true, data: findPackage };
    } else {
      const packageAll = await prisma.package.findMany({});
      return { status: 200, success: true, data: packageAll };
    }
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const updatePackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization"); // fixed typo
    if (!authHeader) {
      return { success: false, status: 401, msg: "Unauthorized access" };
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (payload?.role !== "admin") {
      return {
        status: 403,
        success: false,
        msg: "Only admin can update package",
      };
    }

    const { id, ...others } = await req.json();

    if (!id) {
      return { success: false, status: 400, msg: "Package id is required" };
    }

    const updatedPackage = await prisma.package.update({
      where: { id: parseInt(id) },
      data: others,
    });

    return {
      success: true,
      status: 200,
      msg: "Package updated successfully",
      data: updatedPackage,
    };
  } catch (e) {
    return { status: 500, success: false, msg: e?.message };
  }
};

export const deletePackage = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return { success: false, status: 401, msg: "Unauthorized access" };
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (payload?.role !== "admin") {
      return {
        success: false,
        status: 403,
        msg: "Only admin can delete packages",
      };
    }

    const url = new URL(req.url);
    let id = url.searchParams.get("id");

    if (!id) {
      const body = await req.json();
      id = body.id;
    }

    if (!id) {
      return { success: false, status: 400, msg: "Package id is required" };
    }

    const deletedPackage = await prisma.package.delete({
      where: { id: parseInt(id) },
    });

    return {
      success: true,
      status: 200,
      msg: "Package deleted successfully",
      data: deletedPackage,
    };
  } catch (e) {
    return { success: false, status: 500, msg: e?.message };
  }
};

// app/api/upload/route.js
import { NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../../../firebase";

const storage = getStorage(app);

export async function POST(req) {
  try {
    // formData থেকে ফাইল পড়া
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // ফাইলকে ArrayBuffer → Buffer-এ কনভার্ট করা
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Firebase Storage-এ আপলোড
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `uploads/${fileName}`);
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Public URL নেওয়া
    const downloadURL = await getDownloadURL(storageRef);

    return NextResponse.json({ url: downloadURL });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

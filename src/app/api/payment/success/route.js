export async function POST(req) {
    const formData = await req.formData();
  
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");
  
    // Extra fields (যদি তুমি পাঠাও)
    const classInfo = JSON.parse(formData.get("value_a") || '{}');
    const userInfo = JSON.parse(formData.get("value_b") || '{}');
  
    // enrollClass ID ধরে নাও (যদি তুমি enrollClass table এ ট্রানজেকশন ম্যানেজ করো)
    // const tran_id = formData.get("tran_id"); // তুমি initiate তে পাঠাতে পারো value_d বা অন্য field
  
    // PUT request to internal API to update status
    if (tran_id) {
      try {
        await fetch(`http://localhost:3000/api/class?id=${tran_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "paid", transactionId: tran_id }),
        });
      } catch (err) {
        console.error("Error updating enrollClass:", err);
      }
    }
  
    return Response.redirect(
      `http://localhost:3000/payment/success?tran_id=${tran_id}&amount=${amount}&currency=${currency}`
    );
  }
  
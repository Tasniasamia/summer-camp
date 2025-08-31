export const cancelSSLcommerze=async(req)=>{
    try{
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");
    const classInfo = JSON.parse(formData.get("value_a") || '{}');
    const userInfo = JSON.parse(formData.get("value_b") || '{}');
    if (tran_id) {
      try {
        await fetch(`http://localhost:3000/api/enroll`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancel", transactionId: tran_id }),
        });
      } catch (err) {
        console.error("Error updating enrollClass:", err);
      }
    }
  
    return (
      `http://localhost:3000/payment/cancel?tran_id=${tran_id}&amount=${amount}&currency=${currency}`
    );
}
catch(err){
    return ({success:false,msg:err.message,status:500})
}
}
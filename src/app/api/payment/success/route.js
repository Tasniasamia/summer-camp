import { successSSLcommerze } from "@/lib/controllers/payment/ssl_commerze/success";
import { handleError } from "@/lib/helpers/errorHandler";


export async function POST(req) {
  try{
    const data=await successSSLcommerze(req);
    return new Response.redirect(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}
  
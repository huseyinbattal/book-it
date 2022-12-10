import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";
import { stripeCheckoutSession } from "../../../controllers/paymentController";

const handler = nc({ onError });

dbConnect();
handler.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default handler;

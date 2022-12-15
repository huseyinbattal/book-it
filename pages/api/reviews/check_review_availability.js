import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { checkReviewAvailability } from "../../../controllers/roomControllers";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .put(checkReviewAvailability);
    
export default handler;
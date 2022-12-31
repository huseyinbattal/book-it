import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { createRoomReview,getRoomReviews } from "../../../controllers/roomControllers";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser)
    .put(createRoomReview);

handler
    .use(isAuthenticatedUser)
    .get(getRoomReviews);
    
export default handler;

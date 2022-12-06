import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { checkRoomBookingsAvailability } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookingsAvailability);

export default handler;

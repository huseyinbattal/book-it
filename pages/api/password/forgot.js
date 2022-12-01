import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";


import { forgotPassword } from "../../../controllers/authController";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.post(forgotPassword);

export default handler;

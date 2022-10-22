import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import { getSingleRoom } from "../../../controllers/roomControllers";

const handler = nc();

dbConnect();

handler.get(getSingleRoom);


export default handler;

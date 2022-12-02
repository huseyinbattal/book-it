import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'

import { resetPassword } from "../../../../controllers/authController"

import onError from "../../../../middlewares/errors"

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword)

export default handler;
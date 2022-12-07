import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actions/roomActions";
import RoomItem from "./room/RoomItem";

const MyBookings = () => {
  return (
    <div>MyBookings</div>
  )
}

export default MyBookings
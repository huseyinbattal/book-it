import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";
import { getAdminRooms } from "../../redux/actions/roomActions";

const AllRooms = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { loading, error, rooms } = useSelector((state) => state.allRooms);

  console.log(bookings);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

    return (
        <div>

        </div>
  )
};

export default AllRooms;

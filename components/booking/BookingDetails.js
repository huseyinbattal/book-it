import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/bookingActions";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const { booking, error } = useSelector((state) => state.bookingDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
          {booking && (
            <>
            <h2 className="my-5">Booking # {booking._id}</h2>
              <h4 className="mb-4">User Info</h4>
              <p><b>Name:</b>{booking.user && booking.user.name}</p>
              <p><b>Email:</b>{booking.user && booking.user.email}</p>
            <p><b>Amount:</b> ${ booking.amountPaid}</p>
              <hr />

              <h4 className="mb-4">Booking Info</h4>
              <p>
                <b>Check In:</b> CHECK_IN_DATE
              </p>
              <p>
                <b>Check Out:</b> CHECK_OUT_DATE
              </p>
              <p>
                <b>Days of Stay:</b> 5
              </p>

              <hr />

              <h4 className="my-4">Payment Status</h4>
              <p className="greenColor">
                <b>Paid</b>
              </p>

              <h4 className="mt-5 mb-4">Booked Room:</h4>

              <hr />
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img src="" alt="" />
                  </div>

                  <div className="col-5 col-lg-5">
                    <a href="#">Room Name</a>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>$45</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>4 Day(s)</p>
                  </div>
                </div>
              </div>
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

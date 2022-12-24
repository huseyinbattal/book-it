import easyinvoice from "easyinvoice";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  getAdminBookings,
  deleteBooking,
} from "../../redux/actions/bookingActions";
import { DELETE_BOOKING_RESET } from "../../redux/constants/bookingConstants";
import Loader from "../layout/Loader";
import { useRouter } from "next/router";

const AllBookings = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { bookings, error, loading } = useSelector((state) => state.bookings);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/bookings");
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  const setBookings = () => {
    const data = {
      columns: [
        { label: "Booking ID", field: "id", sort: "asc" },
        { label: "Check In", field: "checkIn", sort: "asc" },
        { label: "Check Out", field: "checkOut", sort: "asc" },
        { label: "Amount paid", field: "amount", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/admin/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteBookingHandler(booking._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  const deleteBookingHandler = (id) => {
    dispatch(deleteBooking(id));
  };

  const downloadInvoice = async (booking) => {
    var data = {
      customize: {},
      images: {
        logo: "https://bookit.vercel.app/images/bookit_logo.png",
        background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      sender: {
        company: "Book IT",
        address: "13Th Street. 47W  13th St.",
        zip: "10001",
        city: "New York",
        country: "United States",
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: "",
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          "en-US"
        )}`,
        country: `Check Out: ${new Date(booking.checkOutDate).toLocaleString(
          "en-US"
        )}`,
      },
      information: {
        number: `${booking._id}`,

        date: `${new Date(Date.now()).toLocaleString("en-US")}`,

        "due-date": "31-12-2021",
      },

      products: [
        {
          quantity: booking.daysOfStay,
          description: `${booking.room.name}`,
          "tax-rate": 0,
          price: booking.room.pricePerNight,
        },
      ],

      "bottom-notice":
        "This is auto generated Invoice of your booking on Book IT.",

      settings: { currency: "USD" },

      translate: {},
    };
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };
  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{`${bookings && bookings.length} Bookings`}</h1>
          <MDBDataTable
            data={setBookings()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  );
};

export default AllBookings;

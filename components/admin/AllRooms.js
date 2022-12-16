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

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const setRooms = () => {
    const data = {
      columns: [
        { label: "Room ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Price / Night", field: "price", sort: "asc" },
        { label: "Category", field: "category", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button className="btn btn-danger mx-2">
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        });
      });
    return data;
  };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{`${rooms && rooms.length} Rooms`}</h1>
          <MDBDataTable
            data={setRooms()}
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

export default AllRooms;

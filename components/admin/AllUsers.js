import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAdminUsers, clearErrors } from "../../redux/actions/userActions";
// import { DELETE_ROOM_RESET } from "../../redux/constants/roomConstants";

const AllUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  //const { error: deleteError, isDeleted } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(clearErrors());
    // }
    // if (isDeleted) {
    //   router.push("/admin/rooms");
    //   dispatch({ type: DELETE_ROOM_RESET });
    // }
  }, [dispatch]);

  const setUsers = () => {
    const data = {
      columns: [
        { label: "User ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
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

  //   const deleteRoomHandler = (id) => {
  //     dispatch(deleteRoom(id));
  //   };

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5"> {`${users && users.length} Users`}</h1>
          <MDBDataTable
            data={setUsers()}
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

export default AllUsers;

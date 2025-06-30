import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchAllUser = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    console.log(dataResponse);

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="bg-white p-3">
      <table className="w-full userTable ">
        <thead>
          <tr className="bg-black text-white">
            <th>SNO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {allUsers?.map((users, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{users?.name}</td>
                <td>{users?.email}</td>
                <td>{users?.role}</td>
                <td>{moment(users?.createdAt).format("lll")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(users);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onCLose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;

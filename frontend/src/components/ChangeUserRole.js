import { IoClose } from "react-icons/io5";
import ROLE from "../common/role";
import { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onCLose, userId, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);

    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onCLose();
      callFunc();
    }

    console.log("Updated Role", responseData);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-60">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onCLose}>
          <IoClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex items-center my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block py-2 px-3 rounded bg-yellow-600 text-white hover:bg-yellow-700 hover:scale-110 "
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;

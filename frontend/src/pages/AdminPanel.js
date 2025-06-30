import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import role from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== role.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer hover:scale-105 flex justify-center">
            {user?.profileImg ? (
              <img
                src={user?.profileImg}
                alt={user.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaUser />
            )}
          </div>
          <p className="capitalize text-xl font-semibold">{user?.name}</p>
          <p className="text-xs">{user?.role}</p>
        </div>

        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-4 py-2 hover:text-yellow-600">
              All Users
            </Link>
            <Link
              to={"all-products"}
              className="px-4 py-2 hover:text-yellow-600"
            >
              Product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

import { GrSearch } from "react-icons/gr";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import role from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logoutUser.url, {
      method: SummaryApi.logoutUser.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to="/">
            <h2 className="text-xl font-mono">WStore</h2>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search Product Here.."
            className="w-full outline-none pl-2"
          />
          <div className="text-lg min-w-[50px] w-13 h-8 bg-yellow-600 flex items-center justify-center rounded-r-full text-white hover:scale-105 cursor-pointer">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-10 ">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-2xl cursor-pointer hover:scale-105 flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profileImg ? (
                  <img
                    src={user?.profileImg}
                    alt={user.name}
                    className="w-11 h-10 rounded-full"
                  />
                ) : (
                  <FaUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 p-2 top-11 h-fit shadow-lg rounded ">
                <nav>
                  {user?.role === role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-200 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link
              to={"/cart"}
              className="text-2xl relative cursor-pointer hover:scale-105"
            >
              <span>
                <FaShoppingCart />
              </span>

              <div className="bg-yellow-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4">
                <p className="text-sm ">{context.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 "
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-700 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

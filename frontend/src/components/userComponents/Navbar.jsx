import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; 
import { setUser } from "../../redux/authSlice";
import { USER_API_ENDPOINT } from "../../utils/data";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import defaultProfileImage from "../../assets/Profile.PNG"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        closeSidebar()
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };
  return (
    <div className="bg-white mx-3">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-[#00A36C] font-extrabold">Career </span>
          <span className="text-[#3b3533] font-extrabold">Craft</span>
        </Link>
        {/* Toggle sidebar */}
        <button
          className="font-bold sm:hidden visible"
          onClick={() => setSidebarOpen(true)}
        > 
          <GiHamburgerMenu size={26}/>
        </button>
        <div
          className={`${
            !sidebarOpen && "hidden"
          } fixed inset-0 z-10 transition-colors bg-black opacity-70`}
          onClick={closeSidebar}
        ></div>

        <div
          className={`flex sm:flex-row flex-col items-center justify-between sm:static fixed right-0 top-0 bg-white sm:bg-transparent h-screen sm:h-auto z-50 shadow-lg sm:shadow-none w-2/3 sm:w-auto text-center py-10 gap-10  ${
            !sidebarOpen && "sm:translate-x-0 translate-x-full"
          } transition-transform `}
        >
          <button
            className={`absolute top-5 right-5 font-bold ${
              !sidebarOpen && "hidden"
            }`}
            onClick={closeSidebar}
          >
            <IoIosClose size={26}/>
          </button>
          <ul className="sm:flex font-medium items-center gap-6 sm:space-y-0 space-y-2">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"} onClick={closeSidebar}>
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"} onClick={closeSidebar}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/home"} onClick={closeSidebar}>
                    Home
                  </Link>
                </li>
               
                <li>
                  <Link to={"/jobs"} onClick={closeSidebar}>
                    Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2 justify-center">
              <Link to={"/login"}>
                <Button variant="outline" onClick={closeSidebar}>
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button
                  className="bg-red-600  hover:bg-red-700"
                  onClick={closeSidebar}
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user.profile.profilePhoto ? user.profile.profilePhoto : defaultProfileImage}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.profile.profilePhoto ? user.profile.profilePhoto : defaultProfileImage}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600  ">
                   <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        <Link to={"/profile"} onClick={closeSidebar}> Profile</Link>{" "}
                      </Button>
                    </div>

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

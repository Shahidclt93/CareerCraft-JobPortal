import React, { useEffect, useState } from "react";
import Navbar from "../../components/userComponents/Navbar";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { RadioGroup } from "../../components/ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../../utils/apisEndPoints";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setToken } from "../../redux/authSlice";
import GoogleAuth from "../../components/userComponents/GoogleAuth";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <div className="lg:w-2/5 sm:w-1/2 w-full border shadow-lg rounded-md p-4 my-10 mx-4">
          <form onSubmit={submitHandler} className="w-full">
            <h1 className="font-bold text-xl mb-5 text-center text-blue-600">
              Login
            </h1>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
              ></Input>
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
              ></Input>
            </div>

            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-4 my-5 ">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="r1"
                    name="role"
                    value="Candidate"
                    checked={input.role === "Candidate"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Candidate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="r2"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <button
              type="submit"
              className="w-full py-2 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800 rounded-md"
            >
              Login
            </button>

            <div className=" ">
              <p className="text-sm text-gray-700 text-center my-2">
                Create new Account{" "}
                <Link to="/register" className="text-blue-700">
                  <button className="w-full py-2 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-green-600 hover:bg-green-800 rounded-md">
                    Register
                  </button>
                </Link>
              </p>
            </div>
          </form>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Login;

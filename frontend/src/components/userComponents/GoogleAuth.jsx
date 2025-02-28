import React from "react";
import { USER_API_ENDPOINT } from "../../utils/apisEndPoints";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import { toast } from "sonner";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await axios.get(
          `${USER_API_ENDPOINT}/google?code=${authResult.code}`
        );
        const token = result.data.token;
        const user = result.data.user;
        dispatch(setToken(token));
        dispatch(setUser(user));
        toast.success("Login Success");
        navigate("/");
      } else {
        console.log(authResult);
        toast.error("Logiin failed");
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <>
      <button
        className="w-full flex items-center justify-center border rounded-full py-2 hover:shadow-md "
        onClick={googleLogin}
      >
        <FcGoogle size={24} /> <p className="pl-6">Sign in with Google</p>
      </button>
    </>
  );
};

export default GoogleAuth;

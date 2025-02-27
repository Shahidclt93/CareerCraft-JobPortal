import React from "react";
import { USER_API_ENDPOINT } from "../../utils/apisEndPoints";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${USER_API_ENDPOINT}/google`; // Redirect to backend
  };

  return (
    <>
      <button
        className="w-full flex items-center justify-center border rounded-full py-2 hover:shadow-md "
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={24} /> <p className="pl-6">Sign in with Google</p>
      </button>
    </>
  );
};

export default GoogleAuth;

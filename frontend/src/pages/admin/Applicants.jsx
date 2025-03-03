import React, { useEffect } from "react";
import ApplicantsTable from "../../components/adminComponents/ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "../../utils/apisEndPoints";
import Navbar from "../../components/userComponents/Navbar";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setAllApplicants(res.data.job));
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="my-10 px-3">
        <h1 className="font-bold my-5">
          Applicants:  {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;

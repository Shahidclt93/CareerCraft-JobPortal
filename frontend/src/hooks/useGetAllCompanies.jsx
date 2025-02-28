import { setCompanies } from "../redux/companyslice";
import { COMPANY_API_ENDPOINT } from "../utils/apisEndPoints";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, [dispatch, token]);
};

export default useGetAllCompanies;

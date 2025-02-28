import { setSingleCompany } from "../redux/companyslice";
import { COMPANY_API_ENDPOINT } from "../utils/apisEndPoints";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setSingleCompany(res.data.company));
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch, token]);
};

export default useGetCompanyById;

import React, { useEffect, useState } from "react";
import Navbar from "../../components/userComponents/Navbar";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import CompaniesTable from "../../components/adminComponents/CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="my-10 px-3">
        <div className="flex items-center justify-between flex-wrap my-5">
          <Input
            className="w-fit"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button className="sm:mt-0 mt-2" onClick={() => navigate("/admin/companies/create")}>
            Add Company
          </Button>
        </div>
        <div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;

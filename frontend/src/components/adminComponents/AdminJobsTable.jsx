import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { toast } from "sonner";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash, Eye, MoreHorizontal } from "lucide-react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT } from "../../utils/apisEndPoints";
import axios from "axios";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }

  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      console.log(res.data);

      setFilterJobs(filterJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log(filterJobs);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs.length === 0 ? (
            <span>No Job Added</span>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 py-1 text-sm">
                      {/* Confirmation modal for accept or reject application */}
                      <Dialog>
                        <DialogTrigger>
                          <div className="flex items-center gap-2 w-fit cursor-pointer mb-1">
                            <Trash className="w-4" />
                            <span>Delete</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Confirmation</DialogTitle>
                          <DialogDescription></DialogDescription>
                          <p className="text-gray-700">
                            Are sure you want to delete the job?
                          </p>
                          <DialogFooter>
                            <DialogClose className="px-4 py-2 bg-gray-200 rounded">
                              Cancel
                            </DialogClose>
                            <DialogClose
                              className="px-4 py-2 bg-green-500 text-white rounded"
                              onClick={() => deleteJob(job._id)}
                            >
                              Confirm
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <hr />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4"></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;

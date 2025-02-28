import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "../../utils/apisEndPoints";
import { setAllApplicants } from "../../redux/applicationSlice";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }

      dispatch(
        setAllApplicants({
          ...applicants,
          applications: applicants?.applications?.map((app) =>
            app._id === id ? { ...app, status } : app
          ),
        })
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="float-right flex sm:flex-row flex-col items-center justify-center cursor-pointer">
                  <span className="mr-2">{item?.status}</span>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-28 py-1 space-y-2 text-sm">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center w-fit cursor-pointer "
                          >
                            {/* Confirmation modal for accept or reject application */}
                            <Dialog>
                              <DialogTrigger>{status}</DialogTrigger>
                              <DialogContent>
                                <DialogTitle>Confirmation</DialogTitle>
                                <DialogDescription></DialogDescription>
                                <p className="text-gray-700">
                                  Are sure you what want to {status} the
                                  application?
                                </p>
                                <DialogFooter>
                                  <DialogClose className="px-4 py-2 bg-gray-200 rounded">
                                    Cancel
                                  </DialogClose>
                                  <DialogClose
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                    onClick={() =>
                                      statusHandler(status, item?._id)
                                    }
                                  >
                                    Confirm
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

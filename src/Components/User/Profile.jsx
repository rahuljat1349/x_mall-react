import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleModal from "./Modal";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { getUserInfo } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user || {});
  useEffect(() => {
    console.log(user);
    setUserInfo(user);
  }, [user]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <>
      <div className="w-[100vw] py-8 flex justify-center">
        <div className="sm:w-[70%] p-2 sm:p-8 justify-start gap-8 flex flex-col h-[55vh] w-[60%] md:h-[70vh] sm:h-[60vh] lg:w-[60%] shadow-xl rounded-3xl">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-gray-700 text-lg font-semibold">Name</h1>
            <h1 className="text-gray-400 font-semibold">{user && user.name}</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-gray-700 text-lg font-semibold">Email</h1>
            <h1 className="text-gray-400 font-semibold">
              {user && user.email}
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-gray-700 text-lg font-semibold">Joined On</h1>
            <h1 className="text-gray-400 font-semibold">
              {user && user.createdAt.slice(0, 10)}
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              Update Profile
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog>
                <DialogTitle>Update Profile</DialogTitle>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setOpen(false);
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <input
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="text"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <input
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="email"
                      />
                    </FormControl>
                    <button className="p-2 rounded bg-red-400 text-white hover:bg-red-500 duration-200">
                      Submit
                    </button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen2(true)}
            >
              Change Password
            </Button>
            <Modal open={open2} onClose={() => setOpen2(false)}>
              <ModalDialog>
                <DialogTitle>Change Password</DialogTitle>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setOpen2(false);
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Old Password</FormLabel>
                      <input
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="password"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <input
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="password"
                      />
                    </FormControl>
                    <button className="p-2 rounded bg-red-400 text-white hover:bg-red-500 duration-200">
                      Submit
                    </button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import { updateProfile } from "../../Features/User/userSlice";
import { updatePassword } from "../../Features/User/userSlice";
import { getUserInfo } from "../../Features/User/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [updateProfileData, setUpdateProfileData] = useState({
    name: "",
    email: "",
  });
  const [updatePasswordData, setUpdatePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user || {});

  const handleUpdatePassword = () => {
    dispatch(updatePassword(updatePasswordData));
  };
  const handleUpdateProfile = () => {
    dispatch(updateProfile(updateProfileData));
  };
  const handleProfileInputChange = (e) => {
    setUpdateProfileData({
      ...updateProfileData,
      [e.target.name]: e.target.value,
    });
    // console.log(updateProfileData);
  };
  const handlePasswordInputChange = (e) => {
    setUpdatePasswordData({
      ...updatePasswordData,
      [e.target.name]: e.target.value,
    });
    // console.log(updatePasswordData);
  };
  useEffect(() => {
    // console.log(user);

    setUserInfo(user);
  }, [user, handleUpdateProfile]);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <>
      <div className="w-[100vw] py-8 flex justify-center">
        <div className="sm:w-[70%] p-2 sm:p-8 justify-start gap-8 flex flex-col h-[60vh] w-[60%] md:h-[80vh] sm:h-[70vh] lg:w-[60%] shadow-xl rounded-3xl">
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
                    handleUpdateProfile();
                    setOpen(false);
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <input
                        name="name"
                        onChange={handleProfileInputChange}
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="text"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <input
                        name="email"
                        onChange={handleProfileInputChange}
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
                    handleUpdatePassword();
                    event.preventDefault();
                    setOpen2(false);
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Old Password</FormLabel>
                      <input
                        name="oldPassword"
                        onChange={handlePasswordInputChange}
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="password"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <input
                        name="newPassword"
                        onChange={handlePasswordInputChange}
                        className="p-2 rounded border-2 border-solid border-gray-200 focus:border-gray-400 outline-none"
                        type="password"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirm New Password</FormLabel>
                      <input
                        name="confirmPassword"
                        onChange={handlePasswordInputChange}
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
          <Link
            to={"/orders"}
            className="bg-red-500 text-center hover:bg-red-600 duration-200 p-2 rounded text-white"
          >
            My Orders
          </Link>
        </div>
      </div>
    </>
  );
}

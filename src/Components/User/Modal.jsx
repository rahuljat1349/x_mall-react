import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function SimpleModal() {
  const [passwordType, setPasswordType] = useState("password");

  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <span onClick={() => setOpen(true)}>New project</span>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogContent>Fill in the information to update.</DialogContent>
          <div className="flex justify-around w-full items-center ">
            <img
              className="w-28 rounded-sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ihS3fAvKqH5iJ5R3j5KR7VXd5aoYVlbk5cmTyy-y0vU90nCYkWvsRXdQfAy02AgoZ8k&usqp=CAU"
              alt=""
            />
            <Button
              className="w-[40%] h-10 p-0"
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              color="neutral"
              startDecorator={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              <span className="text-xs"> Upload Picture</span>
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>

          <form
            onSubmit={() => {
              event.preventDefault();
              setOpen(false);
            }}
            action=""
            className=" gap-2 flex flex-col justify-center items-center "
          >
            <input
              className="w-full border-solid duration-300 focus:border-red-500 border-red-200 border-2 text-red-500 p-2 outline-none rounded-md"
              placeholder="John Doe"
              type="email"
              required
            />

            <input
              className="w-full border-solid  duration-300 focus:border-red-500 border-red-200 border-2 text-red-500 p-2 outline-none rounded-md"
              placeholder="john@example.com"
              type="email"
              required
            />

            <button className="w-full p-2 hover:bg-red-500 bg-red-400 text-white duration-300 outline-none rounded-md">
              Submit
            </button>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

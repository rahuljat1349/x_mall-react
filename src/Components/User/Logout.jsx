import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useNavigate } from "react-router-dom";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function AlertDialogModal() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  return (
    <React.Fragment>
      <div className="h-[100vh]  bg-gray-800"></div>{" "}
      <Modal open={open} onClose={() => navigate("/")}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>Are you sure you want to LogOut?</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("cart");
                localStorage.removeItem("shippingDetails");
                navigate("/");
              }}
            >
              Log me Out!
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}

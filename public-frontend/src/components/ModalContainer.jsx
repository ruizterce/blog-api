import { useState } from "react";
import { Modal, Box, Button, ButtonGroup } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";

const ModalContainer = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleOpen = (formType) => {
    setIsLogin(formType === "login");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <ButtonGroup size="small" aria-label="Button group">
        <Button
          color="white"
          variant="contained"
          startIcon={<Face6RoundedIcon />}
          onClick={() => handleOpen("login")}
        >
          Login
        </Button>
        <Button
          color="white"
          variant="contained"
          endIcon={<AppRegistrationRoundedIcon />}
          onClick={() => handleOpen("register")}
        >
          Register
        </Button>
      </ButtonGroup>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {isLogin ? (
            <LoginForm onClose={handleClose} />
          ) : (
            <RegisterForm onClose={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;

import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

interface PopUpNoticeProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
  description: string;
  buttonText: string;
}

const PopUpNotice: React.FC<PopUpNoticeProps> = ({
  open,
  onClose,
  onContinue,
  title,
  description,
  buttonText,
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" id="modal-title">
          {title}
        </Typography>
        <Typography id="modal-description" mt={2}>
          {description}
        </Typography>
        <Button
          fullWidth
          style={{ marginTop: "16px" }}
          variant="contained"
          color="primary"
          onClick={onContinue}
        >
          {buttonText}
        </Button>
      </Box>
    </Modal>
  );
};

export default PopUpNotice;

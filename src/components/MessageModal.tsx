import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MessageModalProps } from "../types/types";

const MessageModal: React.FC<MessageModalProps> = ({
  open,
  title,
  message,
  onClose,
  linkTo,
  linkText,
  recordId,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    onClose();
    if (linkTo) {
      navigate(linkTo, { state: { recordId } });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {/* Conditionally render link if provided */}
        {linkTo && linkText && (
          <Button onClick={handleLinkClick} color="primary">
            {linkText}
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageModal;

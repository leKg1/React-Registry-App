import React from "react";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { CustomLinkProps } from "../types/types";

const CustomLink: React.FC<CustomLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      color="primary"
      component={Link}
      to={to}
      sx={{
        textTransform: "none",
        fontWeight: isActive ? "bold" : "normal",
        borderBottom: isActive ? "2px solid" : "none",
        margin: "0 10px", // adjust spacing as needed
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)", // subtle hover effect
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomLink;

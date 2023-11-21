import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Link } from "react-router-dom";
import CustomLink from "./CustomLink";

const AppBarComponent: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "white",
        color: "primary.main",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Registry App
          </Link>
        </Typography>
        <CustomLink to="/create" label="Create Record" />
        <CustomLink to="/list" label="List Records" />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;

import React from "react";
import { useScrollTrigger, Slide } from "@mui/material";
import { HideOnScrollProps } from "../types/types";

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;

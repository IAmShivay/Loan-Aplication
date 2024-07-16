import React, { ReactNode } from "react";
import { Link as MuiLink } from "@mui/material";

interface CustomLinkProps {
  children: ReactNode;
  href:string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, ...rest }) => {
  return (
    <MuiLink
      underline="none"
      color="inherit"
      sx={{
        fontWeight: 500,
        cursor: "pointer",
        borderRadius: "4px",
        padding: "8px 16px",
        display: "inline-block",
        backgroundColor: "transparent",
        border: "2px solid transparent",
      }}
      {...rest}
    >
      {children}
    </MuiLink>
  );
};

export default CustomLink;

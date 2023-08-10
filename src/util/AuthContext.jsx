// AuthContext.js
import React from "react";
import useUser from "../hooks/useUser";
import { useLocation, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { isCookieExpired } from "./cookieAuth";
import { getCookie } from "./cookieAuth";

export function AuthProvider({ children }) {
  const user = useUser();
  const { pathname } = useLocation();
  const authPages = ["/"];
  const isAuthPage = authPages.includes(pathname);
  const getCookieValue = getCookie("authToken");

  if (user.isLoading) {
    return (
      <Box
        sx={{
          maxWidth: "31%",
          margin: "auto",
          marginTop: "1rem",
          maxWidth: { xs: "100%", sm: "100%", md: "31%" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10rem",
          }}
        >
          <CircularProgress size="4rem" color="error" />
        </Box>
      </Box>
    );
  }

  if (isAuthPage && user.data) {
    return <Navigate to="/home" />;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!getCookieValue || !user.data) {
    localStorage.clear();
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

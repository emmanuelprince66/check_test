import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routess from "./containers/Routess";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./helpers/queryClient";
import { AuthProvider } from "./util/AuthContext";
import { Provider } from "react-redux";
import { getCookie } from "./util/cookieAuth";

import "./App.css";

function App() {
  useEffect(() => {
    const getCookieValue = getCookie("authToken");
    if (!getCookieValue) {
      localStorage.clear();
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Routess />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

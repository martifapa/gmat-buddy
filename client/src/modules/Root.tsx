import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./navBar/components/Navbar";
import Toast from "./toast/components/Toast";
import useAuth from "../common/hooks/useAuth";
import LoadingPage from "./loadingPage/components/LoadingPage";


export default function Root() {
  const { refreshLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    if (token && username) {
      refreshLogin(token, username);
    }
    setIsLoading(false)
  }, []);

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
      <Toast />
      <Navbar />
      <Outlet />
    </>
  );
};
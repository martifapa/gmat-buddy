import { Outlet } from "react-router-dom";

import Navbar from "./navBar/components/Navbar";
import Toast from "./toast/components/Toast";


export default function Root() {

  return (
    <>
      <Toast />
      <Navbar />
      <Outlet />
    </>
  );
};
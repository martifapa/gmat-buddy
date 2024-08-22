import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Toast from "./Toast";

function Root() {

  return (
    <>
      <Toast />
      <Navbar />
      <Outlet />
    </>
  );
};


export default Root;
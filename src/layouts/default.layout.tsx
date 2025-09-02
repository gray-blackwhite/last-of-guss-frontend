import UserWidget from "@components/user-widget";
import { Outlet } from "react-router";
import { useConnection } from "../hooks/useConnection";

const DefaultLayout = () => {
  useConnection();

  return (
    <div>
      <div className="bg-base-300 shadow-sm z-10 relative">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <h1 className="text-2xl uppercase font-bold">
              Hit the <span className="text-accent">GUSS!</span>
            </h1>
          </div>
          <div className="navbar-end">
            <UserWidget />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;

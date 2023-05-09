import React, { useEffect } from "react";
import Dashboard from "../components/dash";
import Sidebar from "../components/global/Sidebar";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Admin from "./Admin";
import VerifyAccount from "../components/dash/VerifyAccount";

function Dash(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [panel, setPanel] = useState("dash");
  useEffect(() => {
    const send = async () => {
      const res = await dispatch(getOneUser());
      setUser(res?.payload?.data?.data);
    };
    send();
  }, [dispatch]);
  const handleChangePanel = (newPanel) => {
    console.log(newPanel);
    panel === "dash" ? setPanel(newPanel) : setPanel(newPanel);
  };

  return (
    <div className="app">
      {user?.role !== "admin" ? (
        <>
          <Sidebar
            isSidebar={true}
            status={user.accountStatus}
            photo={user.photo}
            name={user.name}
            admin={user.role === "admin"}
            handleChangePanel={handleChangePanel}
          />
          {panel === "dash" ? (
            <main className="content">
              <Dashboard user={user} />
            </main>
          ) : (
            <main className="content">
              <VerifyAccount />
            </main>
          )}
        </>
      ) : (
        <main className="content">
          <Admin user={user} />
        </main>
      )}
    </div>
  );
}

export default Dash;

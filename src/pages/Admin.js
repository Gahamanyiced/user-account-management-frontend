import React from "react";
import Dashboard from "../components/dash";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import VerifyAccount from "../components/dash/VerifyAccount";
import GetUsers from "../components/dash/GetUsers";

function Admin(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [panel, setPanel] = useState("dash");
  useEffect(() => {
    const send = async () => {
      const res = await dispatch(getOneUser());
      setUser(res.payload.data.data);
    };
    send();
  }, [dispatch]);
  const handleChangePanel = (newPanel) => {
    panel === "dash" ? setPanel(newPanel) : setPanel(newPanel);
  };

  return (
    <div className="app">
      <Sidebar
        isSidebar={true}
        status={user.accountStatus}
        photo={user.photo}
        name={user.name}
        role={user.role}
        admin={user.role === "admin"}
        handleChangePanel={handleChangePanel}
      />
      {panel === "dash" ? (
        <main className="content">
          <Dashboard admin user={user} />
        </main>
      ) : (
        <main className="content">
          <GetUsers />
        </main>
      )}
    </div>
  );
}

export default Admin;

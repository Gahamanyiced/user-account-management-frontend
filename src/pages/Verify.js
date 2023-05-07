import React from "react";
import GetUsers from "../components/dash/GetUsers";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Dash() {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const send = async () => {
      const res = await dispatch(getOneUser());
      setUser(res.payload.data.data);
    };
    send();
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar
        isSidebar={true}
        status={user.accountStatus}
        photo={user.photo}
        name={user.name}
        admin={user.role === "admin"}
      />
      <main className="content">
        <GetUsers />
      </main>
    </div>
  );
}

export default Dash;

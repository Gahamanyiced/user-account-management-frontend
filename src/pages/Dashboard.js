import React, { useEffect } from "react";
import Dashboard from "../components/dash";
import Sidebar from "../components/global/Sidebar";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Dash(props) {
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
        <Dashboard user={user} />
      </main>
    </div>
  );
}

export default Dash;

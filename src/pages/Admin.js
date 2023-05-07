import React from "react";
import Dashboard from "../components/dash";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import useEffect from "react";

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
        role={user.role}
        admin={user.role === "admin"}
      />
      <main className="content">
        <Dashboard admin />
      </main>
    </div>
  );
}

export default Dash;

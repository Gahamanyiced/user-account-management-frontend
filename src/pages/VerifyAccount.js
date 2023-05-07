import React from "react";
import VerifyAccount from "../components/dash/VerifyAccount";
import Sidebar from "../components/global/Sidebar";
import { useState } from "react";
import { getOneUser } from "../features/User/getOneUserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function VerifyAcc(props) {
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
        <VerifyAccount />
      </main>
    </div>
  );
}

export default VerifyAcc;

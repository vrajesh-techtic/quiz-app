import React from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import QuizList from "../components/admin/QuizList";
import WithAuth from "../auth/WithAuth";

const AdminLibrary = () => {
  return (
    <AdminSideBar selectedKeys={2}>
      <QuizList />
    </AdminSideBar>
  );
};

export default WithAuth(AdminLibrary);

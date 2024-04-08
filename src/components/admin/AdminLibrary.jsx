import React from "react";
import AdminSideBar from "./AdminSideBar";
import QuizList from "./QuizList";

const AdminLibrary = () => {
  return (
    <AdminSideBar selectedKeys={2}>
      <QuizList />
    </AdminSideBar>
  );
};

export default AdminLibrary;

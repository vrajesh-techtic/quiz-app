import React from "react";
import AdminSideBar from "./AdminSideBar";
import RecentQuiz from "./RecentQuiz";
import StatisticDashboard from "./StatisticDashboard";

const AdminDashboard = () => {
  return (
    <>
      <AdminSideBar selectedKeys={1}>
        <div className=" h-full p-8">
          {/* Insights Container  */}
          <StatisticDashboard />

          {/* Recent Quiz  */}
          <RecentQuiz />
        </div>
      </AdminSideBar>
    </>
  );
};

export default AdminDashboard;

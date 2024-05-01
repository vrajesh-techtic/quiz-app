import React from "react";
import AdminSideBar from "../components/admin/AdminSideBar";
import RecentQuiz from "../components/admin/RecentQuiz";
import StatisticDashboard from "../components/admin/StatisticDashboard";
import WithAuth from "../auth/WithAuth";

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

export default WithAuth(AdminDashboard);

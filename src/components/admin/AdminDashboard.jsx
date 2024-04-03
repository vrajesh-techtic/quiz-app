import React from "react";
import AdminSideBar from "./AdminSideBar";
import QuizList from "./QuizList";

const AdminDashboard = () => {
  return (
    <>
      <AdminSideBar selectedKeys={1}>
        <div className=" h-full p-8">
          {/* Statistics Container  */}
          <div className=" flex h-[25%] items-center  justify-evenly">
            <div
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className="flex flex-col bg-yellow-200 w-fit p-4 rounded-lg"
            >
              <span className="text-xl">Total Quizzes</span>
              <span className="text-4xl font-medium">5</span>
            </div>

            <div
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className="flex flex-col bg-blue-200 w-fit p-4 rounded-lg"
            >
              <span className="text-xl">Total Departments</span>
              <span className="text-4xl font-medium">3</span>
            </div>

            <div
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className="flex flex-col bg-green-200 w-fit p-4 rounded-lg"
            >
              <span className="text-xl">Total Participants</span>
              <span className="text-4xl font-medium">48</span>
            </div>

            <div
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className="flex flex-col bg-red-200 w-fit p-4 rounded-lg"
            >
              <span className="text-xl">Live Quizzes</span>
              <span className="text-4xl font-medium">2</span>
            </div>
          </div>

          <QuizList />
        </div>
      </AdminSideBar>
    </>
  );
};

export default AdminDashboard;

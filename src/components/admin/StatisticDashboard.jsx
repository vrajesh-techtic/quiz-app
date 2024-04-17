import React, { useContext } from "react";
import AdminContextAPI from "./AdminContextAPI";

const StatisticDashboard = () => {
  const data = useContext(AdminContextAPI);

  return (
    <>
      {/* Divider  */}
      <div className="flex items-center">
        {/* Title  */}
        <div className="border-2 border-gray-400 h-0 w-[7%]"></div>
        <span className="h-[10%] text-2xl font-medium mx-4">Insights</span>
        <div className="border-2 border-gray-400 h-0 w-full"></div>
      </div>

      {/* Cards Container  */}
      <div className=" flex flex-wrap items-center  ">
        {/* Total Quizzes Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="stats-card bg-yellow-200 "
        >
          <span className="stats-card-title">Total Quizzes</span>
          <span className="stats-card-data">{data["total-quizzes"]}</span>
        </div>

        {/* Total Departments Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="stats-card bg-blue-200 "
        >
          <span className="stats-card-title">Total Departments</span>
          <span className="stats-card-data">{data["total-dept"]}</span>
        </div>

        {/* Total Participant Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="stats-card bg-green-200 "
        >
          <span className="stats-card-title">Total Participants</span>
          <span className="stats-card-data">
            {data["total-all-participants"]}
          </span>
        </div>

        {/* Live Quizzes Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="stats-card bg-red-200 "
        >
          <span className="stats-card-title">Live Quizzes</span>
          <span className="stats-card-data">{data["live-quizzes"]}</span>
        </div>
      </div>
    </>
  );
};

export default StatisticDashboard;

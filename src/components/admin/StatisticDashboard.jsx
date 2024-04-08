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
      <div className=" flex h-[25%] items-center   justify-evenly">
        {/* Total Quizzes Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="flex flex-col bg-yellow-200 w-fit p-4 rounded-lg"
        >
          <span className="text-xl">Total Quizzes</span>
          <span className="text-4xl font-medium">{data["total-quizzes"]}</span>
        </div>

        {/* Total Departments Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="flex flex-col bg-blue-200 w-fit p-4 rounded-lg"
        >
          <span className="text-xl">Total Departments</span>
          <span className="text-4xl font-medium">{data["total-dept"]}</span>
        </div>

        {/* Total Participant Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="flex flex-col bg-green-200 w-fit p-4 rounded-lg"
        >
          <span className="text-xl">Total Participants</span>
          <span className="text-4xl font-medium">
            {data["total-all-participants"]}
          </span>
        </div>

        {/* Live Quizzes Card  */}
        <div
          style={{ boxShadow: "4px 4px 0px 2px black" }}
          className="flex flex-col bg-red-200 w-fit p-4 rounded-lg"
        >
          <span className="text-xl">Live Quizzes</span>
          <span className="text-4xl font-medium">{data["live-quizzes"]}</span>
        </div>
      </div>
    </>
  );
};

export default StatisticDashboard;

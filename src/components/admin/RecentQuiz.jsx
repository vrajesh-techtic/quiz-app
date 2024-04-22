import React, { useContext, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Statistic } from "antd";
import AdminContextAPI from "./AdminContextAPI";
const { Countdown } = Statistic;

const RecentQuiz = () => {
  const data = useContext(AdminContextAPI);

  const [deadline, setdeadline] = useState(
    data["recent-quiz"]["time-remaining"]
  );

  const onFinish = () => {
    console.log("finished!");
  };

  return (
    <>
      {/* Divider  */}
      <div className="flex mt-16 items-center">
        <div className="border-2 border-gray-400 h-0 w-[7%]"></div>
        <span className=" flex  items-center text-2xl  font-medium mx-4">
          <span className="me-2">Recent</span> <ClockCircleOutlined />
        </span>
        <div className="border-2 border-gray-400 h-0 w-full"></div>
      </div>

      {/* Quiz Details  */}
      <div className="mt-3">
        <div className="flex items-center ">
          {/* Quiz & Department Title */}
          <div className="flex flex-col">
            <span className="md:text-2xl lg:text-3xl font-medium">
              {data["recent-quiz"]["quiz-name"]}
            </span>
            <span className="text-lg ">{data["recent-quiz"]["dept-name"]}</span>
          </div>

          {/* End Quiz Button  */}
          <button
            onClick={() => {
              let res = window.confirm(
                "Are you sure, you want to end the quiz?"
              );

              if (res) {
                setdeadline(() => 0);
                alert("Quiz ended!");
              }
            }}
            className="flex bg-[red] ms-12 font-medium text-lg text-[white] h-[35px] p-3 rounded-md items-center"
          >
            End Quiz
          </button>
        </div>

        {/* Cards Container  */}
        <div className=" flex flex-wrap  items-center mt-7  ">
          {/* Total Questions Card  */}
          <div
            style={{ boxShadow: "4px 4px 0px 2px black" }}
            className="stats-card  bg-orange-200 "
          >
            <span className="stats-card-title ">Total Questions</span>
            <span className="stats-card-data">
              {data["recent-quiz"]["total-ques"]}
            </span>
          </div>

          {/* Time Remaining Card  */}
          <div
            style={{ boxShadow: "4px 4px 0px 2px black" }}
            className="stats-card  bg-violet-200 "
          >
            <Countdown
              title={
                <span className="stats-card-title  text-black flex items-center">
                  Time Remaining
                  {/* <div className="w-[10px]">
                    <img style={{ width: "100%" }} src={timerIcon} alt="" />
                  </div> */}
                </span>
              }
              valueStyle={{
                fontSize: window.innerWidth === 768 ? "30px" : "2.25rem",
                lineHeight: window.innerWidth === 768 ? "40px" : "2.5rem",
                fontWeight: "500",
              }}
              value={deadline}
              onFinish={onFinish}
            />
          </div>

          {/* Total Participants Card  */}
          <div
            style={{ boxShadow: "4px 4px 0px 2px black" }}
            className="stats-card  bg-[#FFF455] "
          >
            <span className="stats-card-title ">Total Participants</span>
            <span className="stats-card-data ">
              {data["recent-quiz"]["total-participants"]}
            </span>
          </div>

          {/* Submissions Card  */}
          <div
            style={{ boxShadow: "4px 4px 0px 2px black" }}
            className="stats-card bg-[#87A922] "
          >
            <span className="stats-card-title ">Submissions</span>
            <span className="stats-card-data ">
              {data["recent-quiz"]["submissions"]}
            </span>
          </div>

          {/* Highest Score Card  */}
          <div
            style={{ boxShadow: "4px 4px 0px 2px black" }}
            className="stats-card  bg-[#EE99C2] "
          >
            <span className="stats-card-title ">Highest Score</span>
            <span className="stats-card-data ">
              {data["recent-quiz"]["highest-score"]}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentQuiz;

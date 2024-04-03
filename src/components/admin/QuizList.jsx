import React, { useState } from "react";

const QuizList = () => {
  const deptList = ["Department-1", "Department-2", "Department-3"];

  const [deptNo, setdeptNo] = useState(0);

  const adminQuizData = [
    {
      "dept-name": "Department-1",
      "quiz-list": [
        "Department-1 Quiz-1",
        "Department-1 Quiz-2",
        "Department-1 Quiz-3",
        "Department-1 Quiz-4",
      ],
    },
    {
      "dept-name": "Department-2",
      "quiz-list": ["Department-2 Quiz-1", "Department-2 Quiz-2"],
    },
    {
      "dept-name": "Department-3",
      "quiz-list": [
        "Department-3 Quiz-1",
        "Department-3 Quiz-2",
        "Department-3 Quiz-3",
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between w-full  h-[75%] p-5">
        <div className="w-[60%] mx-auto border-2 border-gray-100"></div>
        <span className="h-[10%] text-2xl font-medium">My Collection</span>
        <div className="h-[85%]  rounded-lg mx-auto w-[95%] flex items-center ">
          <div className=" h-[280px] flex items-center bg-gray-100 rounded-lg p-2 w-[25%]">
            <ul className=" dept-list w-full flex flex-col px-2 items-center h-[245px] overflow-auto ">
              {adminQuizData.map((i, key) => (
                <li
                  onClick={() => {
                    setdeptNo(key);
                  }}
                  style={{
                    backgroundColor: deptNo === key ? "#ca89fd" : "#04c1cc",
                  }}
                  key={key}
                  className=" my-1 text-lg text-white font-medium  rounded-lg cursor-pointer w-full text-center p-2 "
                >
                  {i["dept-name"]}
                </li>
              ))}
            </ul>
          </div>

          <div className="quiz-list-container h-[280px] bg-gray-100  mx-2 rounded-lg p-4 w-[75%]">
            <ul className=" dept-list flex flex-col px-2 items-center h-[245px] overflow-auto ">
              {adminQuizData.at(deptNo)["quiz-list"].map((i, key) => (
                <li
                  key={key}
                  className=" border-gray my-1 bg-[#F7DED0] text-black rounded-lg  text-xl  cursor-pointer w-full py-8 px-4 "
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizList;

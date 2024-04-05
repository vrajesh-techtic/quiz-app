import React, { useState } from "react";

const quesList = [
  {
    id: 1,
    content: "What is Capital of India ?",
    options: ["Gujarat", "Rajasthan", "New Delhi", "Mumbai"],
    correctAns: "New Delhi",
  },
  {
    id: 2,
    content: "What is Capital of Pakistan ?",
    options: ["Islamabad", "Karachi", "Kargil", "Lahore"],
    correctAns: "Islamabad",
  },
  {
    id: 3,
    content: "What is Capital of China ?",
    options: ["Beijing", "Shanghai", "Wuhan", "Korea"],
    correctAns: "Beijing",
  },
  {
    id: 4,
    content: "What is Capital of USA ?",
    options: ["Washington DC", "Toronto", "Chicago", "Texas"],
    correctAns: "Washington DC",
  },
];

const CreateSider = ({ quesList, currQues, setCurrQues }) => {
  console.log("Sider");
  console.log("quesList", quesList);

  return (
    <div className="w-[230px] flex flex-col items-center bg-gray-100 h-full">
      <div className="mt-4">
        <span className="text-2xl my-3 font-medium">Question List</span>
      </div>

      {/* Question List  */}
      <div className="flex flex-col items-center mt-5 w-full">
        <ul className="w-[90%] mx-3 ">
          {quesList.length === 0 ? (
            <li
              style={{
                backgroundColor: "#ca89fd",
              }}
              // onClick={() => setCurrQues(key + 1)}
              className="cursor-pointer rounded-lg  my-2 p-2 text-center w-full"
            >
              Question 1
            </li>
          ) : (
            quesList.map((i, key) => (
              <li
                key={key}
                style={{
                  backgroundColor: currQues === key + 1 ? "#ca89fd" : "#04c1cc",
                }}
                onClick={() => setCurrQues(key + 1)}
                className="cursor-pointer rounded-lg  my-2 p-2 text-center w-full"
              >
                Question {key + 1}{" "}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateSider;

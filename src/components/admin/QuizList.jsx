import React, { useContext, useState } from "react";
import AdminContextAPI from "./AdminContextAPI";

const QuizList = () => {
  const [deptNo, setdeptNo] = useState(0);

  const data = JSON.parse(localStorage.getItem("quizData")) || [];

  return (
    <>
      <div className="flex flex-col  w-full h-full p-5">
        {/* My Library Heading  */}
        <div className="flex items-center">
          <div className="border-2 border-gray-400 h-0 w-[7%]"></div>
          <span className=" w-[14%] text-2xl font-medium mx-4">My Library</span>
          <div className="border-2 border-gray-400 h-0 w-full"></div>
        </div>

        {/* List Container  */}

        {data.length ? (
          <div className=" h-[500px] mt-8  rounded-lg mx-auto w-[95%] flex justify-start ">
            {/* Department List  */}
            <div className="flex justify-center bg-gray-100 rounded-lg p-2 w-[25%]">
              <ul className=" dept-list w-full flex flex-col px-2 items-center  overflow-auto ">
                {data?.map((i, index) => (
                  <li
                    onClick={() => {
                      setdeptNo(index);
                    }}
                    style={{
                      backgroundColor: deptNo === index ? "#ca89fd" : "#04c1cc",
                    }}
                    key={index}
                    className=" my-1 text-lg text-white font-medium  rounded-lg cursor-pointer w-full text-center p-2 "
                  >
                    {i["dept-name"]}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz List  */}
            <div className="quiz-list-container  bg-gray-100  mx-2 rounded-lg p-4 w-[75%]">
              <ul className=" dept-list flex flex-col px-2 items-center h-full overflow-auto ">
                {data &&
                  data[deptNo] &&
                  data[deptNo]["quiz-list"]?.map((i, index) => (
                    <li
                      key={index}
                      className=" border-gray my-1 bg-[#F7DED0] text-black rounded-lg  text-xl  cursor-pointer w-full py-8 px-4 "
                    >
                      {i.quizTitle}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className=" bg-gray-100  p-4 mt-8 h-[500px] rounded-lg mx-auto w-[95%] items-center flex justify-center ">
            <span className="text-6xl">No Quiz found!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizList;

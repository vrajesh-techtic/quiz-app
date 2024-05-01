import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import DepartmentModal from "./DepartmentModal";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

const QuizList = () => {
  const [addModalOpen, setaddModalOpen] = useState(false);
  const [delModalOpen, setdelModalOpen] = useState(false);

  const [deptNo, setdeptNo] = useState(0);

  const token = sessionStorage.getItem("token");

  const [data, setdata] = useState([]);
  const [QuizList, setQuizList] = useState([]);

  useEffect(() => {
    const fetchDeptList = async () => {
      const fetchData = await axios
        .post("http://localhost:5000/get-dept-list", { token })
        .then((res) => res.data);

      console.log("fetchData", fetchData);

      if (fetchData.status) {
        setdata(fetchData.data);
        // console.log("fetchData.data[0]._id", fetchData?.data[0]?._id);
        getQuizzesList(0, fetchData?.data[0]?._id);
      }
    };

    fetchDeptList();
  }, [addModalOpen, delModalOpen]);

  async function getQuizzesList(index, dept_id) {
    setdeptNo(index);
    const fetchQuizList = await axios
      .post("http://localhost:5000/get-quiz-list", { token, dept_id })
      .then((res) => res.data);

    console.log("fetchQuizList", fetchQuizList);
    if (fetchQuizList.status) {
      setQuizList(fetchQuizList?.data?.quizzes);
    }
  }
  // console.log("QuizList", QuizList);
  return (
    <>
      <DepartmentModal
        addModalOpen={addModalOpen}
        delModalOpen={delModalOpen}
        setaddModalOpen={setaddModalOpen}
        setdelModalOpen={setdelModalOpen}
      />
      <div className="flex flex-col  w-full h-full p-5">
        {/* My Library Heading  */}
        <div className="flex items-center">
          <div className="border-2 border-gray-400 h-0 w-[7%]"></div>
          <span className=" w-[14%] text-2xl font-medium mx-4">My Library</span>
          <div className="border-2 border-gray-400 h-0 w-full"></div>
        </div>

        <div className="w-[95%]  mx-auto flex justify-end my-4">
          <button
            className="bg-blue-500 text-white p-2 mx-2 rounded-md"
            onClick={() => setaddModalOpen(true)}
          >
            <PlusCircleOutlined />
            <span className="mx-2">Department</span>
          </button>
          <button
            className="bg-red-500 text-white p-2 mx-2 rounded-md"
            onClick={() => setdelModalOpen(true)}
          >
            <DeleteOutlined />
            <span className="mx-2">Department</span>
          </button>
        </div>

        {/* List Container  */}

        {data && data.length ? (
          <div className=" h-[400px] rounded-lg mx-auto w-[95%] flex justify-start ">
            {/* Department List  */}
            <div className="flex justify-center bg-gray-100 rounded-lg p-2 w-[25%]">
              <ul className=" dept-list w-full flex flex-col px-2 items-center  overflow-auto ">
                {data?.map((i, index) => (
                  <li
                    onClick={() => {
                      getQuizzesList(index, i?._id);
                    }}
                    style={{
                      backgroundColor: deptNo === index ? "#ca89fd" : "#04c1cc",
                    }}
                    key={index}
                    className=" my-1 text-lg text-white font-medium  rounded-lg cursor-pointer w-full text-center p-2 "
                  >
                    {i?.deptName}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz List  */}
            {!QuizList ? (
              <div className=" bg-gray-100  h-[400px] rounded-lg mx-2 w-[75%] items-center flex justify-center ">
                <span className="text-6xl">No Quiz found!</span>
              </div>
            ) : (
              <div className="quiz-list-container  bg-gray-100  mx-2 rounded-lg p-4 w-[75%]">
                <ul className=" dept-list flex flex-col px-2 items-center h-full overflow-auto ">
                  {QuizList?.map((i, index) => {
                    const url = `/admin/editQuiz/${i.quizCode}`;
                    return (
                      <a
                        href={url}
                        className=" hover:text-black border-gray my-1 bg-[#F7DED0] text-black rounded-lg  text-xl  cursor-pointer w-full py-8 px-4 "
                      >
                        <li key={index}>{i.quizName}</li>
                      </a>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className=" bg-gray-100   h-[400px] rounded-lg mx-auto w-[95%] items-center flex justify-center ">
            <span className="text-6xl">No Department found!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizList;

import React, { useContext, useState } from "react";
import AdminContextAPI from "./AdminContextAPI";
import { useEffect } from "react";
import axios from "axios";
import { demoActions } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { quizActions } from "../../store/quizReducers";
import { dataAdmin } from "./DataAdmin";
import DepartmentModal from "./DepartmentModal";

const QuizList = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [deptNo, setdeptNo] = useState(0);

  const dispatch = useDispatch();
  const { setDeptList } = quizActions;
  const data = useSelector((state) => state.deptList) || [];
  // const data = dataAdmin["dept-quiz-list"];
  console.log("data", data);
  useEffect(() => {
    const fetchDeptList = async () => {
      // const fetchData = await axios.get("http://localhost:5000/get-dept-list");
      // dispatch(setDeptList(fetchData.data.data));
    };

    fetchDeptList();
  }, []);

  return (
    <>
      <DepartmentModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className="flex flex-col  w-full h-full p-5">
        {/* My Library Heading  */}
        <div className="flex items-center">
          <div className="border-2 border-gray-400 h-0 w-[7%]"></div>
          <span className=" w-[14%] text-2xl font-medium mx-4">My Library</span>
          <div className="border-2 border-gray-400 h-0 w-full"></div>
        </div>

        <div className="w-[95%]  mx-auto flex justify-end my-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => setModalOpen(true)}
          >
            Add Department
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
                      setdeptNo(index);
                    }}
                    style={{
                      backgroundColor: deptNo === index ? "#ca89fd" : "#04c1cc",
                    }}
                    key={index}
                    className=" my-1 text-lg text-white font-medium  rounded-lg cursor-pointer w-full text-center p-2 "
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quiz List  */}
            <div className="quiz-list-container  bg-gray-100  mx-2 rounded-lg p-4 w-[75%]">
              {/* <ul className=" dept-list flex flex-col px-2 items-center h-full overflow-auto ">
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
              </ul> */}
            </div>
          </div>
        ) : (
          <div className=" bg-gray-100   h-[400px] rounded-lg mx-auto w-[95%] items-center flex justify-center ">
            <span className="text-6xl">No Quiz found!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default QuizList;

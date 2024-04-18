import React, { useCallback, useEffect, useMemo, useState } from "react";

import CreateNavbar from "../components/admin/CreateNavbar";
import CreateSider from "../components/admin/CreateSider";
import Footer from "../components/admin/Footer";
import Toastify from "toastify-js";

import { useDispatch, useSelector } from "react-redux";
import api from "../database/apiCall";
import { demoActions } from "../store";
import CreateQuizPage from "../components/admin/CreateQuizPage";
import { quizActions } from "../store/quizReducers";
import WithAuth from "../auth/WithAuth";
import { useParams } from "react-router-dom";
import axios from "axios";
import useToast from "../components/NotificationPopup";

const CreateCustomSider = () => {
  const generateQuizCode = () => {
    const quizCodeArr = [];
    for (let i = 0; i < 6; i++) {
      quizCodeArr.push(Math.ceil(65 + Math.random() * 25));
    }

    const quizCode = String.fromCharCode(
      quizCodeArr[0],
      quizCodeArr[1],
      quizCodeArr[2],
      quizCodeArr[3],
      quizCodeArr[4],
      quizCodeArr[5]
    );

    return quizCode;
  };

  const [quizDept, setquizDept] = useState("");
  const [quizTitle, setquizTitle] = useState("");
  const [quesList, setquesList] = useState([]);
  const [currQues, setcurrQues] = useState(1);
  const [currQuesData, setcurrQuesData] = useState([]);
  const [quesText, setquesText] = useState("");
  const [optionArr, setoptionArr] = useState(["", "", "", ""]);
  const [corrAns, setcorrAns] = useState(0);
  const token = sessionStorage.getItem("token");
  const { contextHolder, showToast } = useToast();
  const [runEffect, setrunEffect] = useState(false);
  let genquizCode = useMemo(() => generateQuizCode(), []);

  // to fetch question list
  useEffect(() => {
    const fetchQuesList = async () => {
      const api = await axios
        .post("http://localhost:5000/get-all-questions", {
          quizCode: "UIDMOP",
          token,
        })
        .then((res) => res.data);

      if (api.status === false) {
        showToast("error", api.message);
      } else {
        api.data.allQuestions.push({
          ques: "",
          options: ["", "", "", ""],
          correctAns: 0,
          _id: 0,
        });
        setquesList(api.data.allQuestions);
        setcurrQuesData(api.data.allQuestions[currQues - 1]);
      }
      // console.log("api", api);
      // console.log("quesList", quesList);
    };

    fetchQuesList();
  }, [runEffect]);

  // console.log("quesList", quesList);

  // to change data that needs to be sent to QuizPage
  useEffect(() => {
    setquesText(currQuesData?.ques || "");
    setcorrAns(currQuesData?.correctAns || 0);
    setoptionArr(currQuesData?.options || ["", "", "", ""]);
  }, [currQuesData]);

  // to change question data for display
  useEffect(() => {
    setcurrQuesData(quesList[currQues - 1]);
  }, [currQues]);

  const saveNewQuestion = async (data) => {
    const quesAPI = await axios
      .post("http://localhost:5000/add-question", {
        data,
        token,
      })
      .then((res) => res.data);

    console.log("quesAPI", quesAPI);

    if (quesAPI.status) {
      showToast("success", quesAPI.message);
      setrunEffect((prev) => !prev);
    } else {
      showToast("error", quesAPI.message);
    }
  };

  const editQuestion = async (data) => {
    const quesAPI = await axios
      .post("http://localhost:5000/update-question", {
        data,
        token,
      })
      .then((res) => res.data);

    if (quesAPI.status) {
      showToast("success", quesAPI.message);
      setrunEffect((prev) => !prev);
    } else {
      showToast("error", quesAPI.message);
    }

    console.log("data", data);
  };

  return (
    <>
      {contextHolder}
      <div className="h-screen">
        <CreateNavbar
          quizTitle={quizTitle}
          setquizTitle={setquizTitle}
          quizDept={quizDept}
          setquizDept={setquizDept}
          code={genquizCode}
        />

        <div className="flex h-[82%]">
          <CreateSider
            currQues={currQues}
            setCurrQues={setcurrQues}
            code={genquizCode}
            quesList={quesList}

            // allQues={allQues}
          />

          <div className=" h-full p-5 w-full">
            <div className="bg-gray-100 h-full rounded-lg ">
              <CreateQuizPage
                quizCode={genquizCode}
                quizTitle={quizTitle}
                quizDept={quizDept}
                quesText={quesText}
                setquesText={setquesText}
                corrAns={corrAns}
                setcorrAns={setcorrAns}
                optionArr={optionArr}
                setoptionArr={setoptionArr}
                saveNewQuestion={saveNewQuestion}
                currQuesId={currQuesData?._id}
                editQuestion={editQuestion}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WithAuth(CreateCustomSider);

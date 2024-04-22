import React, { useEffect, useMemo, useState } from "react";
import CreateNavbar from "../components/admin/CreateNavbar";
import CreateSider from "../components/admin/CreateSider";
import Footer from "../components/admin/Footer";
import CreateQuizPage from "../components/admin/CreateQuizPage";
import WithAuth from "../auth/WithAuth";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useToast from "../components/NotificationPopup";
import { Spin } from "antd";

const CreateCustomSider = ({ isNew }) => {
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
  const token = sessionStorage.getItem("token");
  localStorage.setItem("token", token);
  const params = useParams();
  const [quizDept, setquizDept] = useState("");
  const [quizTitle, setquizTitle] = useState("");
  const [quizTime, setquizTime] = useState(0);
  const [quesList, setquesList] = useState([]);
  const [currQues, setcurrQues] = useState(1);
  const [currQuesData, setcurrQuesData] = useState([]);
  const [quesText, setquesText] = useState("");
  const [optionArr, setoptionArr] = useState(["", "", "", ""]);
  const [corrAns, setcorrAns] = useState(0);
  const { contextHolder, showToast } = useToast();
  const [runEffect, setrunEffect] = useState(false);
  let genquizCode = useMemo(() => generateQuizCode(), []);
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  if (!isNew) {
    genquizCode = params.id;
  }

  // to fetch question list
  useEffect(() => {
    const fetchQuesList = async () => {
      const api = await axios
        .post("http://localhost:5000/get-all-questions", {
          quizCode: genquizCode,
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
    };

    const fetchQuizData = async () => {
      const api = await axios
        .post("http://localhost:5000/get-quiz", {
          quizCode: genquizCode,
          token,
        })
        .then((res) => res.data);

      if (api.status) {
        setquizTitle(() => api.data.quizName);
        setquizDept(() => api.data.deptName);
        setquizTime(() => api.data.quizTime);
        console.log("api", api);
      }
    };

    fetchQuizData();
    fetchQuesList();
  }, [runEffect]);

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

  const saveQuiz = async (finalObj) => {
    const api = await axios
      .post("http://localhost:5000/create-quiz", finalObj)
      .then((res) => res.data);

    if (api.status) {
      showToast("success", "Quiz saved!");
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        navigate(`/admin/editQuiz/${genquizCode}`);
      }, 500);
    } else {
      showToast("error", api.message);
    }
  };

  const saveNewQuestion = async (data) => {
    const quesAPI = await axios
      .post("http://localhost:5000/add-question", {
        data,
        token,
      })
      .then((res) => res.data);

    if (quesAPI.status) {
      showToast("success", quesAPI.message);
      setcurrQues(currQues + 1);
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
  };

  const deleteQuestion = async (quesId) => {
    const quesAPI = await axios
      .post("http://localhost:5000/delete-question", {
        quesId,
        token,
      })
      .then((res) => res.data);
    if (quesAPI.status) {
      showToast("success", quesAPI.message);
      setrunEffect((prev) => !prev);
    } else {
      showToast("error", quesAPI.message);
    }
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
          isNew={isNew}
          saveQuiz={saveQuiz}
          quizTime={quizTime}
          setquizTime={setquizTime}
        />

        <div className="flex h-[82%]">
          <CreateSider
            currQues={currQues}
            setCurrQues={setcurrQues}
            code={genquizCode}
            quesList={quesList}
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
                currQuesId={currQuesData?._id || 0}
                editQuestion={editQuestion}
                deleteQuestion={deleteQuestion}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
    </>
  );
};

export default WithAuth(CreateCustomSider);

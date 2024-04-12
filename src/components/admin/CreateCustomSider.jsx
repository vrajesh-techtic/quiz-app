import React, { useCallback, useEffect, useMemo, useState } from "react";

import CreateNavbar from "./CreateNavbar";
import CreateSider from "./CreateSider";
import Footer from "./Footer";
import Toastify from "toastify-js";

import { useDispatch, useSelector } from "react-redux";
import api from "../../database/apiCall";
import { demoActions } from "../../store";
import CreateQuizPage from "./CreateQuizPage";
import { quizActions } from "../../store/quizReducers";

const displayToast = (message, color) => {
  Toastify({
    text: message,
    duration: 1000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "10px",
    },
  }).showToast();
};

const CreateCustomSider = ({ isEdit }) => {
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
  // console.log("Custom Sider");
  const dispatch = useDispatch();
  const { setQuestions, setCurrQuesData, setQuizCode } = quizActions;
  const [quizTitle, setquizTitle] = useState("");
  const [quizDept, setquizDept] = useState("");
  const [currQues, setcurrQues] = useState(1);
  const [quesData, setQuesData] = useState({
    ques: "",
    quizCode: "",
    options: [],
    correctAns: 0,
  });

  const allQues = useSelector((state) => state.quizData.questions) || [];
  let currQuesData = useSelector((state) => state.currQuesData);

  let genquizCode = useMemo(() => generateQuizCode(), []);
  async function fetchAllQuestions() {
    const resp = await api.post("/get-all-questions").then((res) => res.data);

    if (resp.status === true) {
      resp.data.push({
        ques: "",
        quizCode: "",
        options: ["", "", "", ""],
        correctAns: 0,
        isSaved: false,
      });
      dispatch(setQuestions(resp.data));
      dispatch(setQuizCode(genquizCode));
    }
  }

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  useEffect(() => {
    allQues?.length && dispatch(setCurrQuesData(currQues));
  }, [currQues, allQues]);

  useEffect(() => {
    setQuesData(currQuesData);
  }, [currQuesData]);

  const onQuestionSave = async (obj) => {
    const findQues = await api
      .post("/find-question", { _id: obj.quesId })
      .then((res) => res.data.status);

    if (findQues) {
      const updateQues = await api
        .post("/update-question", obj)
        .then((res) => res.data);
      if (updateQues.status) {
        displayToast(
          updateQues.message,
          "linear-gradient(to right, #00b09b, #96c93d)"
        );
        setcurrQues(currQues + 1);
        await fetchAllQuestions();
      } else {
        displayToast(updateQues.message, "red");
      }
    } else {
      const addQues = await api
        .post("/add-question", obj)
        .then((res) => res.data);
      if (addQues.status) {
        displayToast(
          addQues.message,
          "linear-gradient(to right, #00b09b, #96c93d)"
        );
        setcurrQues(currQues + 1);
        await fetchAllQuestions();
      } else {
        displayToast(addQues.message, "red");
      }
    }
  };

  return (
    <div className="h-screen">
      <CreateNavbar
        quizTitle={quizTitle}
        setquizTitle={setquizTitle}
        quizDept={quizDept}
        setquizDept={setquizDept}
        isEdit={isEdit}
      />

      <div className="flex h-[82%]">
        <CreateSider
          currQues={currQues}
          setCurrQues={setcurrQues}
          allQues={allQues}
        />

        <div className=" h-full p-5 w-full">
          <div className="bg-gray-100 h-full rounded-lg ">
            <CreateQuizPage
              quesData={quesData}
              quizDept={quizDept}
              onQuestionSave={onQuestionSave}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCustomSider;

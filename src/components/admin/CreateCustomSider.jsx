import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import CreateNavbar from "./CreateNavbar";
import CreateSider from "./CreateSider";
import Footer from "./Footer";

import Toastify from "toastify-js";

import CreateQuizPage from "./CreateQuizPage";
import { QuestionContextAPI } from "./AdminContextAPI";

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

const CreateCustomSider = () => {
  // window.onbeforeunload = function () {
  //   return "Data will be lost if you leave the page, are you sure?";
  // };

  const { dept, quiz } = useParams();

  const existQuizData =
    dept && quiz
      ? JSON.parse(localStorage.getItem("quizData"))
          ?.find((i) => i["dept-name"] === dept)
          ["quiz-list"]?.find((j) => j.quizCode === quiz)
      : [];
  console.log("existQuizData", existQuizData);

  const navigate = useNavigate();

  const { quesList, setquesList } = useContext(QuestionContextAPI);

  const [currQues, setCurrQues] = useState(1);

  const [quesData, setquesData] = useState({ ...quesList[currQues - 1] });

  const [quesText, setquesText] = useState(quesData?.ques);
  const [optionsArr, setOptionsArr] = useState([...quesData?.options]);
  const [corrAns, setcorrAns] = useState(1);
  // quizCode.trim().length === 0 ? false : true
  console.log("quesData", quesData);

  useEffect(() => {
    // console.log("currQues", currQues);

    setquesData(quesList[currQues - 1]);
    setquesText(quesList[currQues - 1]?.ques);
    setOptionsArr(quesList[currQues - 1]?.options);
    setcorrAns(quesList[currQues - 1]?.answer);
  }, [currQues]);

  function onSave(obj) {
    const quesIndex = quesList.findIndex((i) => i.quesId === obj.quesId);

    if (quesIndex === -1) {
      setquesList((prev) => {
        let arr = [obj, ...prev];
        // arr.push(obj);
        return arr;
      });
      setCurrQues(quesList.length + 1);
      setquesText("");
      setOptionsArr(["", "", "", ""]);
      setcorrAns(0);
      displayToast(
        "Question added successfully!",
        "linear-gradient(to right, #00b09b, #96c93d)"
      );
    } else {
      setquesList((prev) => {
        let arr = [...prev];
        arr[quesIndex] = obj;
        // arr.push(obj);
        console.log("arr", arr);
        return arr;
      });
      // setCurrQues(obj.quesId);
      setquesText(obj.ques);
      setOptionsArr(obj.options);
      setcorrAns(obj.answer);
      displayToast(
        "Question updated successfully!",
        "linear-gradient(to right, #00b09b, #96c93d)"
      );
    }
  }

  function onDelete(quesId) {
    const quesIndex = quesList.findIndex((i) => i.quesId === quesId);

    let newArr = [...quesList];
    newArr.splice(quesIndex, 1);

    newArr.map((i, key) =>
      i.quesId === -1 ? (i.quesId = -1) : (i.quesId = key + 1)
    );

    setquesList(newArr);
    setquesText(quesList[currQues].ques);
    setOptionsArr(quesList[currQues].options);
    setcorrAns(quesList[currQues].answer);
  }

  function onPublish(quizDept, quizTitle, quizCode) {
    if (quizTitle === "") {
      displayToast("Please enter Quiz Title!", "red");
    } else if (quizCode === "") {
      displayToast("Please enter Quiz Code!", "red");
    } else if (quizDept === "") {
      displayToast("Please select a department!", "red");
    } else if (quesList.length <= 1) {
      displayToast("Please add a question", "red");
    } else {
      let res = window.confirm("Are you sure you want to publish the Quiz?");
      if (res) {
        const publishData = {
          "dept-name": quizDept,
          "quiz-list": [
            {
              quizTitle: quizTitle,
              questions: quesList,
              quizCode: quizCode,
            },
          ],
        };
        const data = JSON.parse(localStorage.getItem("quizData")) || [];

        const findDept = data.findIndex((i) => i["dept-name"] === quizDept);

        if (data.length > 0 && findDept !== -1) {
          data[findDept]["quiz-list"].push({
            quizTitle: quizTitle,
            questions: quesList,
            quizCode: quizCode,
          });
        } else {
          data.push(publishData);
        }
        // console.log("publishData", publishData);

        localStorage.setItem("quizData", JSON.stringify(data));

        displayToast(
          "Quiz Published Successfully!",
          "linear-gradient(to right, #00b09b, #96c93d)"
        );
        navigate("/admin/dashboard");
      }
    }
  }

  return (
    <div className="h-screen">
      <CreateNavbar
        onPublish={onPublish}
        dept={dept}
        existQuizData={existQuizData}
      />

      {/* Sider & Content Container  */}
      <div className="flex h-[82%]">
        <CreateSider
          currQues={currQues}
          setCurrQues={setCurrQues}
          existQuizData={existQuizData}
        />
        {/* Content  */}
        <div className=" h-full p-5 w-full">
          <div className="bg-gray-100 h-full rounded-lg ">
            <CreateQuizPage
              corrAns={corrAns}
              setcorrAns={setcorrAns}
              quesText={quesText}
              setquesText={setquesText}
              optionsArr={optionsArr}
              setOptionsArr={setOptionsArr}
              currQues={currQues}
              onSave={onSave}
              onDelete={onDelete}
              isSaved={quesData.isSaved}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateCustomSider;

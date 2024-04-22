import React, { useEffect, useState } from "react";
import DisplayQuiz from "./DisplayQuiz";
import LiveTimer from "../components/participants/LiveTimer";
import { useParams } from "react-router-dom";
import axios from "axios";

const LiveQuizPage = () => {
  const [quesList, setquesList] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [quizTime, setquizTime] = useState(0);

  const params = useParams();

  const quizCode = params.id;
  useEffect(() => {
    async function fetchQuestion() {
      const api = await axios
        .post("http://localhost:5000/get-quiz-data", {
          quizCode,
        })
        .then((res) => res.data);

      if (api.status) {
        setquesList(api.data.allQuestions);
        setquizTime(api.data.quizTime);
      }
    }

    fetchQuestion();
  }, []);

  const timer = (
    <LiveTimer timer={quizTime} quizCode={quizCode} setSpinning={setSpinning} />
  );
  return (
    <DisplayQuiz
      timer={timer}
      quesList={quesList}
      quizCode={quizCode}
      spinning={spinning}
    />
  );
};

export default LiveQuizPage;

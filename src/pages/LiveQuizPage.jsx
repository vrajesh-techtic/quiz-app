import React, { useEffect, useState } from "react";
import DisplayQuiz from "./DisplayQuiz";
import LiveTimer from "../components/participants/LiveTimer";
import { useParams } from "react-router-dom";
import axios from "axios";
import InstructionsModal from "../components/participants/InstructionsModal";
import ParticipantWithAuth from "../auth/ParticipantWithAuth";

const LiveQuizPage = () => {
  const [quesList, setquesList] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [quizTime, setquizTime] = useState(0);
  const [instructModal, setinstructModal] = useState(true);

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

  const timer = instructModal ? null : (
    <LiveTimer timer={quizTime} quizCode={quizCode} setSpinning={setSpinning} />
  );
  return (
    <>
      {instructModal ? (
        <InstructionsModal
          modalOpen={instructModal}
          setModalOpen={setinstructModal}
        />
      ) : (
        <DisplayQuiz
          timer={timer}
          quesList={quesList}
          quizCode={quizCode}
          spinning={spinning}
        />
      )}
    </>
  );
};

export default ParticipantWithAuth(LiveQuizPage);

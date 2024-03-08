import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginForm from "./components/LoginForm";
import OTPPage from "./components/OTPPage";
import ContextAPI from "./components/ContextAPI";

import OTPEmail from "./components/OTPEmail";
import DisplayQuiz from "./components/DisplayQuiz";

import ResultPage from "./components/ResultPage";

import QuizTimer from "./components/QuizTimer";

import { useState } from "react";
import questionBank from "./questions/questionBank";
import axios from "axios";

function App() {
  console.log("App");

  const timer = <QuizTimer />;

  const [questionObj, setQuestionObj] = useState(questionBank);

  return (
    <ContextAPI.Provider
      value={{
        questionObj: questionObj,
        setQuestionObj: setQuestionObj,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/authenticate" element={<OTPPage />} />
          <Route path="/email" element={<OTPEmail />} />

          <Route
            path="/authenticate/display-quiz"
            element={<DisplayQuiz timer={timer} />}
          />

          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </ContextAPI.Provider>
  );
}

export default App;

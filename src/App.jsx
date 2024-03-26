import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
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

function App() {
  console.log("App");

  const timer = <QuizTimer />;

  const [questionObj, setQuestionObj] = useState(questionBank);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "/authenticate",
      element: <OTPPage />,
    },
    {
      path: "/authenticate/display-quiz",
      element: <DisplayQuiz timer={timer} />,
    },
    { path: "/result", element: <ResultPage /> },
  ]);

  return (
    <ContextAPI.Provider
      value={{
        questionObj: questionObj,
        setQuestionObj: setQuestionObj,
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ContextAPI.Provider>
  );
}

export default App;

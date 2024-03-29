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
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { demoActions } from "./store";

function App() {
  const timer = <QuizTimer />;

  console.log("App");

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
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

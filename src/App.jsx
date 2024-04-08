import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import OTPPage from "./components/admin/OTPPage";
import ContextAPI from "./components/participants/ContextAPI";
import DisplayQuiz from "./components/participants/DisplayQuiz";
import ResultPage from "./components/participants/ResultPage";
import QuizTimer from "./components/participants/QuizTimer";
import questionBank from "./questions/questionBank";
import UserLogin from "./components/participants/UserLogin";
import ProtectedRoute from "./components/participants/ParticipantsProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./components/admin/AdminLoginForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import HomePage from "./components/HomePage";
import AdminLibrary from "./components/admin/AdminLibrary";
import CreateQuizPage from "./components/admin/CreateQuizPage";
import AdminContextAPI, {
  QuestionContextAPI,
} from "./components/admin/AdminContextAPI";
import { dataAdmin } from "./components/admin/DataAdmin";
import { useState } from "react";
import CreateCustomSider from "./components/admin/CreateCustomSider";

function App() {
  const adminData = dataAdmin;

  const [quesList, setquesList] = useState([
    {
      quesId: -1,
      content: "",
      options: ["", "", "", ""],
    },
  ]);

  const timer = <QuizTimer />;

  let newArr = {};

  for (let i = 0; i < questionBank.length; i++) {
    newArr[i] = null;
  }

  console.log("App");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: <AdminLogin />,
    },
    {
      path: "/admin/authenticate",
      element: <AdminProtectedRoute Component={<OTPPage />} />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminProtectedRoute Component={<AdminDashboard />} />,
    },
    {
      path: "/admin/library",
      element: <AdminProtectedRoute Component={<AdminLibrary />} />,
    },
    {
      path: "/admin/profile",
      element: <AdminProtectedRoute Component={<AdminProfile />} />,
    },
    {
      path: "/admin/create-quiz",
      element: <AdminProtectedRoute Component={<CreateCustomSider />} />,
    },

    {
      path: "/participant",
      element: <UserLogin />,
    },
    {
      path: "/participant/display-quiz",
      element: <ProtectedRoute Component={<DisplayQuiz timer={timer} />} />,
    },
    { path: "/participant/result", element: <ResultPage /> },
  ]);

  return (
    <QuestionContextAPI.Provider value={{ quesList, setquesList }}>
      <AdminContextAPI.Provider value={adminData}>
        <ContextAPI.Provider value={[newArr, questionBank]}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </ContextAPI.Provider>
      </AdminContextAPI.Provider>
    </QuestionContextAPI.Provider>
  );
}

export default App;

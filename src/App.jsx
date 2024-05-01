import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import OTPPage from "./components/admin/OTPPage";
import ContextAPI from "./components/participants/ContextAPI";
import ResultPage from "./pages/ResultPage";
import QuizTimer from "./components/QuizTimer";
import questionBank from "./questions/questionBank";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import HomePage from "./pages/HomePage";
import AdminLibrary from "./pages/AdminLibrary";
import AdminContextAPI from "./components/admin/AdminContextAPI";
import { dataAdmin } from "./components/admin/DataAdmin";
import { useEffect, useState } from "react";
import CreateCustomSider from "./pages/CreateCustomSider";
import AdminSignUp from "./pages/AdminSignUp";
import AdminLoginForm from "./pages/AdminLoginForm";
import LiveQuizPage from "./pages/LiveQuizPage";

function App() {
  const adminData = dataAdmin;

  const [quesList, setquesList] = useState([
    {
      quesId: -1,
      ques: "",
      options: ["", "", "", ""],
      isSaved: false,
      answer: 0,
    },
  ]);

  const timer = <QuizTimer />;

  let newArr = {};

  for (let i = 0; i < questionBank.length; i++) {
    newArr[i] = null;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin/login",
      element: <AdminLoginForm />,
    },
    {
      path: "/admin/signup",
      element: <AdminSignUp />,
    },
    {
      path: "/admin/authenticate",
      element: <OTPPage />,
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/library",
      element: <AdminLibrary />,
    },
    {
      path: "/admin/profile",
      element: <AdminProfile />,
    },
    {
      path: "/admin/create-quiz",
      element: <CreateCustomSider isNew={true} />,
    },
    {
      path: "/admin/editQuiz/:id",
      element: <CreateCustomSider isNew={false} />,
    },

    {
      path: "/participant/login",
      element: <UserLogin />,
    },

    {
      path: "/quiz/:id",
      element: <LiveQuizPage timer={timer} />,
    },
    { path: "/participant/result/:id", element: <ResultPage /> },
  ]);

  return (
    <AdminContextAPI.Provider value={adminData}>
      <ContextAPI.Provider value={[newArr, questionBank]}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </ContextAPI.Provider>
    </AdminContextAPI.Provider>
  );
}

export default App;

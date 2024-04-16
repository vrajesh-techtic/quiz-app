import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import OTPPage from "./components/admin/OTPPage";
import ContextAPI from "./components/participants/ContextAPI";
import DisplayQuiz from "./pages/DisplayQuiz";
import ResultPage from "./pages/ResultPage";
import QuizTimer from "./components/QuizTimer";
import questionBank from "./questions/questionBank";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLoginForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import HomePage from "./pages/HomePage";
import AdminLibrary from "./pages/AdminLibrary";
import CreateQuizPage from "./components/admin/CreateQuizPage";
import AdminContextAPI, {
  QuestionContextAPI,
} from "./components/admin/AdminContextAPI";
import { dataAdmin } from "./components/admin/DataAdmin";
import { useState } from "react";
import CreateCustomSider from "./pages/CreateCustomSider";
import AdminSignUp from "./pages/AdminSignUp";

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

  console.log("App");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
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
      element: <CreateCustomSider isEdit={false} />,
    },
    {
      path: "/admin/edit-quiz/:dept/:quiz",
      element: <CreateCustomSider isEdit={true} />,
    },

    {
      path: "/participant/login",
      element: <UserLogin />,
    },
    {
      path: "/participant/display-quiz",
      element: <DisplayQuiz timer={timer} />,
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

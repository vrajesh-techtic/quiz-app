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

function App() {
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
      path: "/admin/profile",
      element: <AdminProtectedRoute Component={<AdminProfile />} />,
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
    <ContextAPI.Provider value={[newArr, questionBank]}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ContextAPI.Provider>
  );
}

export default App;

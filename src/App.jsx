import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import OTPPage from "./components/OTPPage";
import ContextAPI from "./components/participants/ContextAPI";
import DisplayQuiz from "./components/participants/DisplayQuiz";
import ResultPage from "./components/participants/ResultPage";
import QuizTimer from "./components/participants/QuizTimer";
import questionBank from "./questions/questionBank";
import UserLogin from "./components/participants/UserLogin";

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
      element: <UserLogin />,
    },
    {
      path: "/admin-login",
      element: <LoginForm />,
    },
    {
      path: "/authenticate",
      element: <OTPPage />,
    },
    {
      path: "/participants/display-quiz",
      element: <DisplayQuiz timer={timer} />,
    },
    { path: "/result", element: <ResultPage /> },
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

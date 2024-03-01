
import { Route, Routes } from 'react-router-dom';
import './App.css';

import LoginForm from './components/LoginForm';
import OTPPage from './components/OTPPage';
import ContextAPI from './components/ContextAPI';
import { useState } from 'react';
import OTPEmail from './components/OTPEmail';
import DisplayQuiz from './components/DisplayQuiz';
import Question from './components/Question';

function App() {

  const [useOTP, setuseOTP] = useState(0);

  return (
    <ContextAPI.Provider value={[useOTP, setuseOTP]}>
      <div className="App">
        <Routes>

          <Route path='/' element={<LoginForm />} />
          <Route path='/authenticate' element={<OTPPage />} />
          <Route path='/email' element={<OTPEmail />} />
          <Route path='/authenticate/display-quiz' element={<DisplayQuiz />} />
          <Route path='/authenticate/display-quiz/question' element={<Question />} />





        </Routes >
      </div>
    </ContextAPI.Provider>

  );
}

export default App;

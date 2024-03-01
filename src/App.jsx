
import { Route, Routes } from 'react-router-dom';
import './App.css';

import LoginForm from './components/LoginForm';
import OTPPage from './components/OTPPage';
import ContextAPI from './components/ContextAPI';
import { useState } from 'react';
import OTPEmail from './components/OTPEmail';

function App() {

  const [useOTP, setuseOTP] = useState(0);

  return (
    <ContextAPI.Provider value={[useOTP, setuseOTP]}>
      <div className="App flex flex-col items-center">
        <Routes>

          <Route path='/' element={<LoginForm />} />
          <Route path='/authenticate' element={<OTPPage />} />
          <Route path='/email' element={<OTPEmail />} />



        </Routes >
      </div>
    </ContextAPI.Provider>

  );
}

export default App;

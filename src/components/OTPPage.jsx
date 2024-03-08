import React, { useEffect, useState } from 'react'

import OTPInput from './OTPInput';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';


const OTPPage = () => {

    const [spinning, setSpinning] = useState(false);

    const showLoader = () => {
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            navigate('/authenticate/display-quiz');
        }, 2000);
    };

    useEffect(() => {

    }, []);


    const navigate = useNavigate();

    const userObj = JSON.parse(localStorage.getItem('user'));
    let randomOTP = parseInt(userObj.otp);

    return (
        <>
            <div className='flex w-full h-screen form-container items-center justify-center '>
                <div className=" backdrop-blur-xl hover:shadow-xl	rounded-2xl flex flex-col items-center px-20 py-12">

                    <p className='mb-8 mt-2 text-5xl'>OTP Authentication</p>

                    <OTPInput onOtpSubmit={(userOTP) => {
                        if (randomOTP === parseInt(userOTP)) {
                            showLoader()

                            console.log('OTP Verified !');
                            return true;
                        } else {
                            console.log('Verification Unsuccessful!')
                            return false;
                        }

                    }} />

                </div>
                <Spin spinning={spinning} size='large' tip="Loading ..." fullscreen />


            </div>

        </>
    )
}

export default OTPPage
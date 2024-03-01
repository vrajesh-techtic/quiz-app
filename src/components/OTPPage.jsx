import React from 'react'

import OTPInput from './OTPInput';


const OTPPage = () => {

    let randomOTP = parseInt(localStorage.key(0));

    return (
        <div className='flex w-full h-screen form-container items-center justify-center '>
            <div className=" backdrop-blur-xl hover:shadow-xl	rounded-2xl flex flex-col items-center px-20 py-12">

                <p className='mb-8 mt-2 text-5xl'>OTP Authentication</p>

                <OTPInput onOtpSubmit={(userOTP) => {
                    if (randomOTP === parseInt(userOTP)) {
                        console.log('OTP Verified !');
                        return true;
                    } else {
                        console.log('Verification Unsuccessful!')
                        return false;
                    }

                }} />

            </div>

        </div>
    )
}

export default OTPPage
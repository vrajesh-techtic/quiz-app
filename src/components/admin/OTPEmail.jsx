
import { Button, Tooltip } from 'antd';
import React from 'react'
import logo from '../assets/logo-banner.png';

const OTPEmail = () => {

    let randomOTP = (localStorage.key(0));

    let template = [];
    for (let i = 0; i < 4; i++) {
        template[i] = <span type='text' key={i} className='otpInput border-2 inline-block font-semibold align-middle px-5 py-3 mx-2 rounded-lg bg-white  shadow-2xl text-2xl text-center '>{randomOTP[i]}</span>
    }

    return (
        <div className='flex flex-col items-center bg-red-300 rounded-2xl p-8'>

            <div className='w-[400px] '>

                <img src={logo} className='rounded-2xl' alt="" />
            </div>



            <p className='my-3 mt-5 font-medium text-xl'>Please use Verification code on Quizify to attempt the quiz.</p>

            <div className='flex my-4'>
                {template.map((i) => i)}
            </div>

            <Tooltip placement="top" trigger="click" title={"Code Copied!"}>
                <button
                    className='bg-[#cb88ff] rounded-lg hover:bg-[#00c4cc] flex items-center text-xl text-white px-5 py-3'
                    onClick={() => { navigator.clipboard.writeText(parseInt(randomOTP)) }}>
                    <span>Copy Code</span>
                </button>
            </Tooltip>


            <div className='my-4 font-medium w-[450px] flex flex-col items-center text-center'>

                <span>If you didn't request this, you can ignore this email or let us know at
                    <a href='mailto:support@quizify.com' className="text-blue-600 ms-1 underline underline-offset-4" target='_blank'>support@quizify.com</a>.
                </span>

                <span className='mt-5 w-[100px]'>Thanks! Quizify Team</span>

            </div>
        </div>
    )
}

export default OTPEmail
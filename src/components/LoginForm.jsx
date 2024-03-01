import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// import main from '../server/mailer';

const LoginForm = () => {


    const [remember, setRemember] = useState(sessionStorage.length !== 0);

    const onFinish = async (values) => {

        const randomOTP = Math.floor(Math.random() * (9999 - 1000) + 1000);

        if (remember) {
            sessionStorage.setItem(values.email, values.name)
        }

        console.log('randomOTP', randomOTP);
        localStorage.clear()
        localStorage.setItem(randomOTP, randomOTP);



        // main(randomOTP);
        let response = await axios.post("http://localhost:5000/send-email", { randomOTP });

        console.log('response:', response);

        navigate('/authenticate');

        // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let savedName = '';
    let savedEmail = '';


    if (sessionStorage.length !== 0) {
        savedEmail = sessionStorage.key(0);
        savedName = sessionStorage.getItem(savedEmail);
    }



    const navigate = useNavigate();

    return (
        <div className='flex w-full h-screen form-container items-center justify-center '>
            <div className=" backdrop-blur-xl hover:shadow-xl	rounded-2xl flex flex-col items-center px-20 py-12">

                <p className='mb-8 mt-2 text-5xl'>Participant Login</p>

                <Form
                    name="normal_login"
                    className="login-form flex flex-col mx-8 items-center"
                    size='large'
                    initialValues={{
                        name: savedName,
                        email: savedEmail,
                    }
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <Form.Item

                        name="name"
                        rules={[
                            {
                                type: 'string',
                                required: true,
                                message: 'Name is required !',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} name='name' placeholder="Participant name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please enter correct email !',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            name='email'
                            placeholder="Email address"

                        />
                    </Form.Item>

                    <Form.Item name="remember">
                        <Checkbox className='text-lg' defaultChecked={remember} onChange={() => {
                            setRemember((prev) => !prev);

                        }}  >Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item className='flex flex-col'>
                        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-500" >
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
            </div>

        </div >
    )
}

export default LoginForm



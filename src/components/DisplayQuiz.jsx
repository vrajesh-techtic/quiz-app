import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import logo from '../assets/banner-without-bg.png';
import collapesLogo from '../assets/Collapsed Logo.png';
import { useNavigate } from 'react-router-dom';
import Question from './Question';


const { Header, Content, Footer, Sider } = Layout;

const DisplayQuiz = ({ content }) => {
    // Sider collapse feature 
    const [collapsed, setCollapsed] = useState(false);

    // background color 
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();

    // function to add items in menubar 
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
            onclick: () => {
            }
        };
    }

    // object containing all items in menu 
    const items = [
        getItem('Option 1', '1', <PieChartOutlined />),
        getItem('Option 2', '2', <DesktopOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
            getItem('Tom', '3'),
            getItem('Bill', '4'),
            getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <FileOutlined />),
    ];

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical h-[100px] flex justify-center" >
                    {!collapsed
                        ? <img src={logo} alt='quizify-logo' className='h-full  z-10' />
                        : <img src={collapesLogo} alt='quizify-logo' className='h-full  z-10' />}
                </div>

                <button className='bg-white' onclick={() => navigate('/authenticate/display-quiz/question')}>Question</button>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>

            {/* Right side layout  */}
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '16px',
                        padding: 24,
                        height: "100%",
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    {content}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Quizify ©{new Date().getFullYear()} Created by Quizify Pvt. Ltd.
                </Footer>
            </Layout>
        </Layout >
    );
};
export default DisplayQuiz;
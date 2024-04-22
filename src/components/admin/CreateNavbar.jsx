import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/banner-without-bg.png";
import { PlusOutlined, TrophyOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import useToast from "../NotificationPopup";
import WithAuth from "../../auth/WithAuth";
import LeaderBoardModal from "./LeaderBoardModal";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const CreateNavbar = ({
  code,
  quizTitle,
  setquizTitle,
  quizDept,
  setquizDept,
  isNew,
  saveQuiz,
  quizTime,
  setquizTime,
}) => {
  const quizCode = code || "";
  const token = sessionStorage.getItem("token");
  const { contextHolder, showToast } = useToast();
  const [deptList, setdeptList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // fetch department list
  useEffect(() => {
    const fetchDeptList = async () => {
      const fetchData = await axios
        .post("http://localhost:5000/get-dept-list", { token })
        .then((res) => res.data);

      setdeptList(fetchData.data);
    };

    fetchDeptList();
  }, [quizDept]);

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const titleRef = useRef(null);

  const onQuizSave = async () => {
    if (quizTitle === "") {
      showToast("error", "Please Enter Quiz title!");
    } else if (quizDept === "") {
      showToast("error", "Please select a department!");
    } else if (quizTime === 0) {
      showToast("error", "Quiz time cannot be Zero!");
    } else {
      const deptId = deptList.find((i) => i.deptName === quizDept)._id;

      const data = {
        quizName: quizTitle,
        deptName: quizDept,
        quizCode,
        quizTime,
      };

      const finalObj = {
        data,
        deptId,
        token,
      };

      saveQuiz(finalObj);
    }
  };

  // Add new Department to Database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/create-dept", {
        deptName: name,
        token: token,
      });
      const data = res.data;
      // console.log("res", data);
      if (data && data.status === true) {
        showToast("success", data.message);
      } else {
        showToast("error", data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
    setquizDept(name);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onChange = (time, timeString) => {
    const temp = timeString.split(":");

    const finalTime =
      temp.length !== 1
        ? parseInt(temp[0]) * 3600 +
          parseInt(temp[1]) * 60 +
          parseInt(temp[2]) * 1
        : 0;

    setquizTime(finalTime);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {contextHolder}
      <LeaderBoardModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        quizCode={quizCode}
        token={token}
      />
      <div className="navbar flex justify-between items-center bg-[#001529] h-[9%]">
        <div className="flex justify-center items-center">
          {/* logo container  */}
          <div className="w-[140px] mx-8">
            <a href="/" target="_blank">
              <img src={logo} alt="" />
            </a>
          </div>

          {/* Quiz Title Input  */}
          <div className="flex items-center">
            <input
              ref={titleRef}
              value={quizTitle}
              onChange={(e) => setquizTitle(e.target.value)}
              className="p-1 text-center rounded-lg mx-3"
              type="text"
              placeholder="Quiz Title"
            />
          </div>

          {/* Department Input  */}
          <div className="flex w-[200px]  justify-center mx-8">
            {isNew ? (
              <Select
                style={{
                  width: 300,
                }}
                defaultValue={`${quizDept}`}
                onSelect={(e) => setquizDept(e)}
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                placeholder="Select Department"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Input
                        placeholder="Add new department"
                        ref={inputRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add
                      </Button>
                    </Space>
                  </>
                )}
                options={deptList.map((item) => ({
                  label: item.deptName,
                  value: item.deptName,
                }))}
              />
            ) : (
              <span className="bg-white p-1 rounded-lg text-center w-[200px]">
                {quizDept}
              </span>
            )}
          </div>

          {/* Quiz Code  */}
          <div className="text-white">
            <span className=" text-xl">Quiz Code :</span>
            <span className="py-1 px-2 text-center  bg-white text-black  rounded-lg mx-3">
              {quizCode}
            </span>
          </div>
        </div>

        <div>
          <TimePicker
            onChange={onChange}
            placeholder="Set Quiz Timer"
            size="large"
            className="text-lg bg-white"
            changeOnScroll
            showNow={false}
            needConfirm={false}
            value={dayjs()
              .set("hours", quizTime / 3600)
              .set("minutes", quizTime / 60)
              .set("seconds", quizTime % 60)}
            variant="borderless"
          />
        </div>

        {/* Save Button  */}
        <div className="flex me-16 ">
          <button
            onClick={() => setModalOpen(true)}
            style={{
              boxShadow: "3px 3px 0px #ca89fd",
            }}
            className="flex items-center me-6 p-2 w-fit text-white rounded-lg justify-between bg-[#04c1cc]"
          >
            <TrophyOutlined />
            <span className="ms-1"> Leaderboard</span>
          </button>
          <button
            onClick={onQuizSave}
            style={{
              boxShadow: "3px 3px 0px #04c1cc",
            }}
            className="flex items-center mx-3 p-2 w-fit text-white rounded-lg justify-between bg-[#ca89fd]"
          >
            <FaSave />
            <span className="ms-1"> Save Quiz</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default WithAuth(CreateNavbar);

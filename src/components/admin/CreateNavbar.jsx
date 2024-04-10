import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/banner-without-bg.png";
import { RiEdit2Fill } from "react-icons/ri";
import AdminContextAPI from "./AdminContextAPI";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
let index = 0;

const CreateNavbar = ({ onPublish, existQuizData, dept }) => {
  const data = JSON.parse(localStorage.getItem("quizData")) || [];
  const [quizCode, setQuizCode] = useState(existQuizData.quizCode || "");
  const navigate = useNavigate();
  const deptList = data.map((i) => i["dept-name"]);
  const [quizTitle, setQuizTitle] = useState(existQuizData.quizTitle || "");
  const [quizDept, setQuizDept] = useState(dept || "");
  const [items, setItems] = useState(deptList);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const titleRef = useRef(null);

  // console.log("existingquizData", existingquizData);

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);

    const findDept = data.findIndex((i) => i["dept-name"] === quizDept);
    if (data.length > 0 && findDept !== -1) {
    } else {
      const newDept = {
        "dept-name": name,
        "quiz-list": [],
      };
      data.push(newDept);

      localStorage.setItem("quizData", JSON.stringify(data));
    }

    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onChangeQuizCode = (e) => {
    setQuizCode(e.target.value.toUpperCase());
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
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
            onChange={(e) => setQuizTitle(e.target.value)}
            // disabled={titleEdit ? false : true}
            className="p-1 text-center rounded-lg mx-3"
            type="text"
            placeholder="Quiz Title"
          />
          {/* <RiEdit2Fill
            onClick={() => settitleEdit(true)}
            style={{
              display: titleEdit ? "none" : "block",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          />

          <button
            className="bg-blue-500 py-1 px-3 rounded-lg"
            onClick={() => settitleEdit(false)}
            style={{
              display: titleEdit ? "block" : "none",

              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            Save
          </button> */}
        </div>

        {/* Department Input  */}
        <div className="flex w-[200px]  justify-center mx-8">
          <Select
            style={{
              width: 300,
            }}
            defaultValue={quizDept}
            onSelect={(e) => setQuizDept(e)}
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
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>

      <div>
        <span className="text-white text-xl">Quiz Code :</span>
        <input
          onChange={(e) => onChangeQuizCode(e)}
          value={quizCode}
          maxLength={6}
          minLength={6}
          className="p-1 text-center w-[120px]  rounded-lg mx-3"
          type="text"
          placeholder="E.g. 'ABCD12' "
        />
      </div>

      {/* Publish Button  */}
      <div className="flex me-16 ">
        <button
          onClick={() => onPublish(quizDept, quizTitle, quizCode)}
          style={{
            boxShadow: "3px 3px 0px #04c1cc",
          }}
          className="flex items-center p-2 w-[125px] text-white rounded-lg justify-between bg-[#ca89fd]"
        >
          <FaSave />
          Publish Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateNavbar;

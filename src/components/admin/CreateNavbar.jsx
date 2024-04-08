import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/banner-without-bg.png";
import { RiEdit2Fill } from "react-icons/ri";
import AdminContextAPI from "./AdminContextAPI";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
let index = 0;

const CreateNavbar = () => {
  const [titleEdit, settitleEdit] = useState(false);
  const data = useContext(AdminContextAPI);
  const navigate = useNavigate();
  const deptList = data["dept-quiz-list"].map((i) => i["dept-name"]);
  const [quizTitle, setQuizTitle] = useState("Untitled-1");
  const [quizDept, setQuizDept] = useState("");
  const [items, setItems] = useState(deptList);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  function onPublish() {
    if (quizDept === "") {
      alert("Please select a department!");
    } else {
      console.log("Title :::::: ", quizTitle);
      console.log("Dept :::::: ", quizDept);

      let res = window.confirm("Are you sure you want to publish the Quiz?");
      if (res) {
        alert("Quiz Publish Successfully");
        navigate("/admin/dashboard");
      }
    }
  }

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
            disabled={titleEdit ? false : true}
            className="p-2 rounded-lg mx-3"
            type="text"
            placeholder="Untitled - 1"
          />
          <RiEdit2Fill
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
          </button>
        </div>

        {/* Department Input  */}
        <div className="flex w-[200px]  justify-center mx-8">
          <Select
            style={{
              width: 300,
            }}
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

      {/* Publish Button  */}
      <div className="flex me-16 ">
        <button
          onClick={onPublish}
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

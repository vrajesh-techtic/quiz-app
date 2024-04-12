import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/banner-without-bg.png";
import { RiEdit2Fill } from "react-icons/ri";
import AdminContextAPI from "./AdminContextAPI";
import { PlusOutlined } from "@ant-design/icons";
import { Divider, Input, Select, Space, Button } from "antd";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { demoActions } from "../../store";
import axios from "axios";
import Toastify from "toastify-js";
import api from "../../database/apiCall";
import { quizActions } from "../../store/quizReducers";
// import localhost from "../../database/apiCall";

const displayToast = (message, color) => {
  Toastify({
    text: message,
    duration: 1000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
      borderRadius: "10px",
    },
  }).showToast();
};

let index = 0;

const CreateNavbar = ({
  quizTitle,
  setquizTitle,
  isEdit,
  quizDept,
  setquizDept,
}) => {
  const dispatch = useDispatch();
  const { setDeptList, addDept } = quizActions;
  const quizCode = useSelector((state) => state.quizData.quizCode);

  const deptList = useSelector((state) => state.deptList) || [];

  if (isEdit) {
    quizCode = "Fetch Code";
  }
  // fetch department list
  useEffect(() => {
    const fetchDeptList = async () => {
      const fetchData = await api.get("/get-dept-list");

      dispatch(setDeptList(fetchData.data.data));
    };

    fetchDeptList();
  }, []);

  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const titleRef = useRef(null);

  // Add new Department to Database
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/create-dept", {
        deptName: name,
      });
      const data = res.data;
      console.log("res", data);
      if (data && data.status === true) {
        displayToast(
          "Department created successfully!",
          "linear-gradient(to right, #00b09b, #96c93d)"
        );
        dispatch(addDept(name));
      } else {
        throw new Error(data.message || "Failed to add department.");
      }
    } catch (error) {
      throw new Error(error.message || "Failed to add department.");
    }

    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
            onChange={(e) => setquizTitle(e.target.value)}
            // disabled={titleEdit ? false : true}
            className="p-1 text-center rounded-lg mx-3"
            type="text"
            placeholder="Quiz Title"
          />
        </div>

        {/* Department Input  */}
        <div className="flex w-[200px]  justify-center mx-8">
          <Select
            style={{
              width: 300,
            }}
            defaultValue={quizDept}
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
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add
                  </Button>
                </Space>
              </>
            )}
            options={deptList.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>

      <div className="text-white">
        <span className=" text-xl">Quiz Code :</span>
        <span className="py-1 px-2 text-center  bg-white text-black  rounded-lg mx-3">
          {quizCode}
        </span>
      </div>

      {/* Save Button  */}
      <div className="flex me-16 ">
        <button
          // onClick={() => onPublish(quizDept, quizTitle, quizCode)}
          style={{
            boxShadow: "3px 3px 0px #04c1cc",
          }}
          className="flex items-center p-2 w-[125px] text-white rounded-lg justify-between bg-[#ca89fd]"
        >
          <FaSave />
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateNavbar;

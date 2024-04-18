import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useToast from "../NotificationPopup";

const DepartmentModal = ({ modalOpen, setModalOpen }) => {
  const demoList = ["Dept - 1", "Dept - 1", "Dept - 1", "Dept - 1"];
  const { contextHolder, showToast } = useToast();

  const [Name, setName] = useState("");

  const addDepartment = async () => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const obj = {
        deptName: Name,
        token: token,
      };

      const resp = await axios
        .post("http://localhost:5000/create-dept", obj)
        .then((res) => res.data);

      if (resp.status) {
        showToast("success", resp.message);
      } else {
        showToast("error", resp.message);
      }

      console.log("resp", resp);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        // title="Add Department"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        style={{ width: "100px" }}
        footer={null}
      >
        <div className="flex flex-col">
          <span className="text-3xl text-center">Add Department</span>

          <div className="my-4 flex flex-col h-[200px]">
            <span className="mt-5 text-lg">Department Name</span>
            <input
              type="text"
              placeholder=""
              className="border-2 rounded-md mt-3 p-2 w-[70%] border-black"
              value={Name}
              onChange={(e) => setName(() => e.target.value)}
            />

            <button
              className="bg-blue-300 w-fit text-lg rounded-md flex items-center justify-between p-2 mt-3"
              onClick={addDepartment}
            >
              <PlusCircleOutlined />
              <span className="mx-2">Add</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepartmentModal;

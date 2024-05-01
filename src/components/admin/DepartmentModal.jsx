import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useToast from "../NotificationPopup";

const DepartmentModal = ({
  setdelModalOpen,
  setaddModalOpen,
  delModalOpen,
  addModalOpen,
}) => {
  const { contextHolder, showToast } = useToast();
  const [deptList, setdeptList] = useState([]);
  const [Name, setName] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchDeptList = async () => {
      const fetchData = await axios
        .post("http://localhost:5000/get-dept-list", { token })
        .then((res) => res.data);

      console.log("fetchData", fetchData);

      if (fetchData.status) {
        setdeptList(fetchData.data);
      }
    };

    fetchDeptList();
  }, [delModalOpen]);

  const addDepartment = async () => {
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
        setaddModalOpen(false);
      } else {
        showToast("error", resp.message);
      }
    }
  };

  const deleteDepartment = async (dept_id) => {
    const isSure = window.confirm(
      "All data saved in this department will be lost!"
    );
    if (isSure) {
      const deleteAPI = await axios
        .post("http://localhost:5000/delete-dept", {
          token,
          dept_id,
        })
        .then((res) => res.data);

      if (deleteAPI.status) {
        showToast("success", deleteAPI.message);
        setdelModalOpen(false);
      } else {
        showToast("error", deleteAPI.message);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open={addModalOpen}
        onOk={() => setaddModalOpen(false)}
        onCancel={() => setaddModalOpen(false)}
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

      <Modal
        centered
        open={delModalOpen}
        onOk={() => setdelModalOpen(false)}
        onCancel={() => setdelModalOpen(false)}
        style={{ width: "100px" }}
        footer={null}
      >
        <div className="flex flex-col">
          <span className="text-3xl text-center">Delete Department</span>

          <div className="my-4 flex flex-col ">
            <ul className=" w-[60%] mx-auto">
              {deptList?.map((i) => (
                <li className="bg-gray-200 my-2 p-2 flex justify-between rounded-md text-lg">
                  {i.deptName}
                  <button onClick={() => deleteDepartment(i._id)}>
                    <DeleteOutlined style={{ color: "red" }} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DepartmentModal;

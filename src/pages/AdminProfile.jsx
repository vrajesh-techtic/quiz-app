import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/admin/AdminSideBar";

import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useContext } from "react";
import AdminContextAPI from "../components/admin/AdminContextAPI";
import WithAuth from "../auth/WithAuth";
import axios from "axios";

const AdminProfile = () => {
  const navigate = useNavigate();

  const data = useContext(AdminContextAPI);

  const [isEdit, setIsEdit] = useState(false);

  const [adminData, setAdminData] = useState({});

  function deleteAccount() {
    let res = window.confirm("Do you want to delete your account permanently?");
    if (res) {
      window.alert("Account deleted Successfully!");
      localStorage.removeItem("admin");
      navigate("/admin");
    }
  }

  useEffect(() => {
    async function fetchData() {
      let token = sessionStorage.getItem("token");

      const profileData = await axios
        .post("http://localhost:5000/get-admin", { token })
        .then((res) => res.data);

      if (profileData.status) {
        setAdminData(profileData.data);
      } else {
        console.log(profileData.message);
      }
    }

    fetchData();
  }, []);
console.log('adminData', adminData)
  return (
    <AdminSideBar selectedKeys={3}>
      <div className=" h-[100%] rounded-lg  flex flex-col items-center ">
        {/* Middle Container  */}
        <div className="h-[80%] flex  w-[100%] justify-between items-center px-8">
          {/* Profile Card  */}
          <div className="flex flex-col w-[40%] items-center h-[400px] bg-gray-100 p-8 rounded-xl">
            <div className="profile-image-container w-[130px] h-[130px] flex justify-center mx-8 my-4">
              <img
                className="rounded-full"
                src={data["profile-image"]}
                style={{ width: "100%", height: "auto" }}
                alt=""
              />
            </div>

            <div className="text-2xl flex flex-col items-center">
              <span>{adminData.name}</span>

              <span className="text-xl text-[#04c1cc] cursor-pointer font-medium">
                @{adminData.username}
              </span>
            </div>

            {/* Account Details  */}
            <div className="flex mt-5">
              <div className="bg-[#d7a9fb] w-[170px] rounded-xl justify-center mx-2 text-center h-[80px]  flex flex-col">
                <span className="text-3xl font-medium">
                  {adminData.totalQuizzes}
                </span>
                <span className="text-lg">Quizzes</span>
              </div>
              <div className="bg-[#04c1cc] w-[170px] rounded-xl justify-center mx-2 text-center h-[80px]  flex flex-col">
                <span className="text-3xl font-medium">
                  {adminData.totalDepartments}
                </span>
                <span className="text-lg">Departments</span>
              </div>
            </div>
          </div>

          {/* Edit profile Container  */}
          <div className="flex flex-col w-[55%] text-xl h-[400px] bg-gray-100 p-8 rounded-xl">
            <div className=" h-[10%] flex justify-end w-[100%]">
              <button onClick={() => setIsEdit((prev) => !prev)}>
                {isEdit ? <SaveOutlined /> : <EditOutlined />}{" "}
                {isEdit ? "Save" : "Edit"}
              </button>
            </div>
            <div className=" h-[90%] flex justify-center items-center ">
              <table className="h-[50%]">
                <tbody>
                  <tr>
                    <td>
                      <label className="font-medium">Email: </label>
                    </td>
                    <td>
                      <input
                        disabled={isEdit ? false : true}
                        className="px-2 ms-4 bg-red-300  py-1 rounded-lg"
                        type="email"
                        name="admin-email"
                        defaultValue={adminData.email}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <label className="font-medium">Name: </label>
                    </td>
                    <td>
                      <input
                        disabled={isEdit ? false : true}
                        className="px-2 ms-4 bg-blue-300  py-1 rounded-lg"
                        type="text"
                        name="admin-name"
                        defaultValue={adminData.name}
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>
                      <label className="font-medium">Username: </label>
                    </td>
                    <td>
                      <input
                        disabled={isEdit ? false : true}
                        className="px-2 ms-4 bg-green-300 py-1 rounded-lg"
                        type="text"
                        name="admin-username"
                        defaultValue={adminData.username}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete account  */}
        <div className="w-[100%] h-[10%] mt-12 flex justify-end mr-8">
          <button
            className="bg-red-400 h-[40px] flex items-center text-lg text-white  rounded-lg px-2 "
            onClick={deleteAccount}
          >
            <DeleteOutlined /> <span className="ms-2">Delete Account</span>
          </button>
        </div>
      </div>
    </AdminSideBar>
  );
};

export default WithAuth(AdminProfile);

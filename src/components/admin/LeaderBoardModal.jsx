import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useToast from "../NotificationPopup";
import { TrophyOutlined } from "@ant-design/icons";

const LeaderBoardModal = ({ modalOpen, setModalOpen, quizCode, token }) => {
  //   const [modalOpen, setModalOpen] = useState(false);
  const { contextHolder, showToast } = useToast();

  const [leaderboard, setleaderboard] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const list = await axios
        .post("http://localhost:5000/leaderboard", {
          quizCode,
          token,
        })
        .then((res) => res.data);

      if (list.status) {
        setleaderboard(list.list);
      } else {
        showToast("error", list.message);
      }
    };

    fetchList();
  }, [modalOpen]);

  return (
    <>
      {contextHolder}
      <Modal
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {leaderboard.length !== 0 ? (
          <div className="main-modal-container  m-5">
            <span className="text-3xl flex  justify-center p-2 items-center font-medium">
              <TrophyOutlined />
              <span className="ms-1"> Leaderboard</span>
            </span>

            <div className="main-leaderboard-container p-4 ">
              <div className="leaderboard-title">
                <div className="bg-black text-white rounded-md flex p-3 font-medium justify-between text-xl">
                  <span>Rank</span>
                  <span>Participant Name</span>
                  <span>Score</span>
                </div>
              </div>
              <div className="leaderboard-list-container create-ques-list overflow-auto h-[300px]">
                {leaderboard.map((i, key) => (
                  <div className="bg-gray-100 flex my-2 p-3 rounded-md justify-between text-xl">
                    <span>{key + 1}</span>
                    <span>{i.name}</span>
                    <span>{i.totalScore}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="m-5">
            <span className="text-3xl flex  justify-center p-2 items-center font-medium">
              <TrophyOutlined />
              <span className="ms-1"> Leaderboard</span>
            </span>

            <div className="h-[300px] bg-gray-100 flex items-center justify-center text-4xl rounded-md">
              No Participants Yet !
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default LeaderBoardModal;

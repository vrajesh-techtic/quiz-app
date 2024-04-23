import { Modal } from "antd";
import React from "react";
import ParticipantWithAuth from "../../auth/ParticipantWithAuth";

const InstructionsModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      centered
      open={modalOpen}
      footer={null}
      closable={false}
      closeIcon={false}
    >
      <div className="h-[700px]   flex  flex-col items-center p-8">
        <span className="text-3xl font-medium text-center">
          Welcome to Quizify!
        </span>

        <div className="my-4 text-lg text-justify">
          <p>
            Before you dive into the quiz, here are some instructions to help
            you make the most out of your trivia experience:
          </p>
          <ul className="list-disc">
            <li>
              Each question will be displayed one at a time, but you'll have
              access to a list of all the questions. Read each question
              carefully, select your answer, and proceed to the next question
              using the provided navigation options.
            </li>
            <li>
              All quizzes have a time limit. Keep an eye on the timer and try to
              answer before time runs out.
            </li>

            <li>
              Your score will be calculated based on the number of questions you
              answer correctly. So, make sure to aim for a perfect score!
            </li>

            <li>
              After completing the quiz, you'll be able to view your final score
              you've earned on the result card. Take a moment to review your
              performance and see how you did!
            </li>
          </ul>
        </div>
        <span className="text-xl font-medium text-center">
          On closing this instructions, quiz will start.
        </span>
        <span className="text-xl font-medium text-center"> All the best!</span>

        <button
          href="/admin/create-quiz"
          target="_blank"
          rel="noreferrer"
          style={{
            boxShadow: "4px 4px 0px #04c1cc",
          }}
          onClick={() => {
            setModalOpen(false);
          }}
          className="flex justify-center w-[150px] p-3 text-xl bg-[#ca89fd] text-white font-medium  mb-12 mt-4 mx-auto rounded-xl"
        >
          Start Quiz
        </button>
      </div>
    </Modal>
  );
};

export default ParticipantWithAuth(InstructionsModal);

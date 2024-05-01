import { notification } from "antd";

const useToast = () => {
  const [api, contextHolder] = notification.useNotification();
  const notify = (type, message) => {
    api[type]({
      message: message,
    });
  };

  return {
    contextHolder,
    showToast: notify,
  };
};

export default useToast;

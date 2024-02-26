import notificationContext from "./reducer/notificationContext";
import { useContext } from "react";

const Notification = ({ type }) => {
  const [notification, notificationDispatch] = useContext(notificationContext);

  if (!notification) return null;

  const className = notification.type === "success" ? "success" : "error";

  return <div className={className}>{notification.message}</div>;
};

export default Notification;

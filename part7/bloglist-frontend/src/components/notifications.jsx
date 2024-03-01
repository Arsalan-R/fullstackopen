import notificationContext from "./reducer/notificationContext";
import { useContext } from "react";
import Alert from '@mui/material/Alert';

const Notification = ({ type }) => {
  const [notification, notificationDispatch] = useContext(notificationContext);

  if (!notification) return null;

  const severity = notification.type === "success" ? "success" : "error";

  return (
  <Alert severity={severity}>{notification.message}</Alert>
  )
};

export default Notification;
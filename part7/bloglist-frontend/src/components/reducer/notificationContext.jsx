import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return (state = {
        message: action.payload,
        type: "success",
      });
    case "ERROR":
      return (state = {
        message: action.payload,
        type: "error",
      });
    case "HIDE":
      return null;
  }
};

const notificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  );
};

export default notificationContext;

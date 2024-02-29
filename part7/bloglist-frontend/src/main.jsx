import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./components/reducer/notificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./components/reducer/userContext";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
  <UserContextProvider>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </UserContextProvider>
  </Router>,
);

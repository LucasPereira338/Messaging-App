import Home from "../pages/Home/Home";
import MessageBoard from "../pages/MessageBoard/MessageBoard";
import Profile from "../pages/Profile/Profile";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/messages",
    element: <MessageBoard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default routes;

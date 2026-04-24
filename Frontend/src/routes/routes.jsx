import Home from "../pages/Home";
import MessageBoard from "../pages/MessageBoard/MessageBoard";
import Profile from "../pages/Profile";
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

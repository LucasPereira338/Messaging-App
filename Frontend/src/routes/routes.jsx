import Home from "../pages/Home/Home";
import MessageBoard from "../pages/MessageBoard/MessageBoard";
import Registration from "../pages/Registration/Registration";
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
    path: "/sign-up",
    element: <Registration />,
  },
]);

export default routes;

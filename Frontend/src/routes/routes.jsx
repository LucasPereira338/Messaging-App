import Home from "../pages/Home";
import MessageBoard from "../pages/MessageBoard/MessageBoard";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "messages",
    element: <MessageBoard />,
  },
]);

export default routes;

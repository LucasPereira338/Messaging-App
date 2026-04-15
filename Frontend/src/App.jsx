import "./App.css";
import Home from "./pages/Home";
import MessageBoard from "./pages/MessageBoard";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "messages",
    element: <MessageBoard />,
  },
]);

function App() {
  return (
    <div className="full-page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

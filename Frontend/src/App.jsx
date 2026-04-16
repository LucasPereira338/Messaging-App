import "./App.css";
import Home from "./pages/Home";
import MessageBoard from "./pages/MessageBoard";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <div className="full-page">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

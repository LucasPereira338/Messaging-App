import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <div className="full-page">
      <div className="full-page-content">
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;

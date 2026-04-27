import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <div className="full-page general-borders">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

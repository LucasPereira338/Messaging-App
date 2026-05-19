import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <div className="full-page">
      <img
        src="https://images.pexels.com/photos/7135020/pexels-photo-7135020.jpeg"
        className="background-img"
      />

      <div className="full-page-content">
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;

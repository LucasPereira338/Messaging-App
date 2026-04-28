import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <div className="full-page">
      <Header />
      <RouterProvider router={routes} />
      <Footer />
    </div>
  );
}

export default App;

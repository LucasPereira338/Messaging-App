import "./App.css";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="full-page">
      <Header isLoggedIn={false} />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;

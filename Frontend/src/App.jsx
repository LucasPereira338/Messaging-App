import "./App.css";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";

function App() {
  return (
    <>
      <Header isLoggedIn={false} />
      <Footer />
    </>
  );
}

export default App;

import "./App.css";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { AllArticles } from "./components/AllArticles.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <AllArticles />
      <Footer/>
    </>
  );
}

export default App;

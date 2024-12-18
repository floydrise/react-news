import "./App.css";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ArticlesList } from "./components/ArticlesList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import { Home } from "./components/Home.jsx";
import { Article } from "./components/Article.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={"*"} element={<ErrorPage />} />
          <Route path={"/"} element={<Home />} />
          <Route path={"/articles"} element={<ArticlesList />} />
          <Route path={"/articles/:article_id"} element={<Article />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

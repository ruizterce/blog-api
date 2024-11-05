import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;

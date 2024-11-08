import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:id" element={<PostDetails />} />
            </Routes>
          </Router>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

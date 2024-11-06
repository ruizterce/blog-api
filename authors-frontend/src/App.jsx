import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PostsTable from "./pages/PostsTable";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<PostsTable />} />
            </Route>
          </Routes>
        </Router>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, Box } from "@mui/material";
import theme from "./theme";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PostsTable from "./pages/PostsTable";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPost from "./pages/NewPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<PostsTable />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/edit-post/:id" element={<EditPost />} />
              </Route>
            </Routes>
          </Router>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;

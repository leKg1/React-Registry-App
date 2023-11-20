import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";

import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import Home from "./pages/Home";
import HideOnScroll from "./components/HideOnScroll";
import { RecordProvider } from "./contexts/RecordContext";

const App: React.FC = () => {
  return (
    <RecordProvider>
      <Router>
        <CssBaseline /> {/* Normalize default browser styles */}
        <HideOnScroll>
          <AppBar
            position="fixed"
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "primary.main", cursor: "pointer" }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Registry App
                </Link>
              </Typography>
              <Button
                color="primary"
                component={Link}
                to="/create"
                sx={{ textTransform: "none" }}
              >
                Create Record
              </Button>
              <Button
                color="primary"
                component={Link}
                to="/list"
                sx={{ textTransform: "none" }}
              >
                List Records
              </Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar /> {/* Placeholder for AppBar height */}
        <Container>
          <Box my={4}>
            <Routes>
              <Route path="/create" element={<CreatePage />} />
              <Route path="/edit/:id" element={<EditPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </RecordProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toolbar, Container, Box, CssBaseline } from "@mui/material";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import ListPage from "./pages/ListPage";
import Home from "./pages/Home";
import { RecordProvider } from "./contexts/RecordContext";
import AppBarComponent from "./components/AppBarComponent";

const App: React.FC = () => {
  return (
    <RecordProvider>
      <Router>
        <CssBaseline />
        <AppBarComponent />
        <Toolbar /> {/* Spacer for the AppBar */}
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

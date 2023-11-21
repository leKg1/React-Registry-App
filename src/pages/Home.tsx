import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to different parts of the application
  const navigateToCreate = () => navigate("/create");
  const navigateToList = () => navigate("/list");

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <HomeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to the Registry App
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
          Manage your records with ease
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToCreate}
          >
            Create Record
          </Button>
          <Button variant="outlined" color="primary" onClick={navigateToList}>
            View Records
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Home;

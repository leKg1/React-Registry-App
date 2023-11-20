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
        elevation={6}
        sx={{
          mt: 8,
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <HomeIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            Welcome to the Registry App
          </Box>
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Manage your records with ease
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={navigateToCreate}
            sx={{ mr: 2 }}
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

import React from "react";
import { Box, Container, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Box sx={{ display: "flex", margin: "10% 50%" }}>
          <CircularProgress color="error" />
        </Box>
      </Grid>
    </Container>
  );
};

export default Loader;

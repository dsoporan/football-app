import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ textAlign: "left" }}>
            Football APP
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

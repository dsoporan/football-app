import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const ListItem = ({ icon, label, text }) => {
  return (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <Typography sx={{ width: "150px" }} variant="subtitle1">
        {label}
      </Typography>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

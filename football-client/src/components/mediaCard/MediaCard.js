import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ActionContainer } from "./MediaCard.styles";

export const MediaCard = ({
  image,
  title,
  subtitle,
  leftDescription,
  rightDescription,
}) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ActionContainer>{leftDescription}</ActionContainer>
        <ActionContainer>{rightDescription}</ActionContainer>
      </CardActions>
    </Card>
  );
};

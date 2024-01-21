import { Badge, CardContainer, PlayerPhoto } from "./PlayerCard.styles";
import { IconButton, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const PlayerCard = ({ player, isCoach = false }) => {
  const {
    activeTeam,
    favouritePlayers,
    setFavouritePlayers,
    addFavouritePlayer,
    removeFavouritePlayer,
  } = useContext(DataContext);

  const isFavouritePlayer = useMemo(() => {
    return !!favouritePlayers.find(
      (favPlayer) => favPlayer.player_id === player.id,
    );
  }, [player, favouritePlayers]);

  const handleFavouritePlayer = () => {
    if (isFavouritePlayer) {
      removeFavouritePlayer.mutate(player.id);
      setFavouritePlayers(
        favouritePlayers.filter(
          (favPlayer) => favPlayer.player_id !== player.id,
        ),
      );
    } else {
      addFavouritePlayer.mutate(player.id);
      setFavouritePlayers([...favouritePlayers, { player_id: player.id }]);
    }
  };
  return (
    <CardContainer isCoach={isCoach}>
      <Badge src={activeTeam.logo} alt={activeTeam.name} />
      <Typography
        sx={{
          position: "absolute",
          top: "9%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        variant="h6"
        color="white"
      >
        {player.nationality}
      </Typography>
      <PlayerPhoto src={player?.photo} alt={player.name} />
      <Typography
        sx={{
          position: "absolute",
          top: "34%",
          left: "26%",
          transform: "translate(-50%, -50%)",
        }}
        variant="h6"
        color="white"
      >
        {player.age} y
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "59%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "35px",
          overflow: "hidden",
        }}
        variant="h6"
        color="white"
      >
        {player.name}
      </Typography>
      {!isCoach && (
        <IconButton
          sx={{
            position: "absolute",
            top: "46%",
            left: "26%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
          aria-label="add-favourite"
          size="large"
          onClick={handleFavouritePlayer}
        >
          {isFavouritePlayer ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      )}
      <Typography
        sx={{
          position: "absolute",
          top: "75%",
          left: "30%",
          transform: "translate(-50%, -50%)",
        }}
        variant="h6"
        color="white"
      >
        {player.height}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: "75%",
          left: "70%",
          transform: "translate(-50%, -50%)",
        }}
        variant="h6"
        color="white"
      >
        {player.weight}
      </Typography>
    </CardContainer>
  );
};

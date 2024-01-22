import { useContext, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
import { Box, Typography } from "@mui/material";
import { PlayerListContainer } from "../playerList/PlayerList.styles";
import { PlayerCard } from "../playerCard/PlayerCard";

export const FavouritePlayerList = () => {
  const { players, favouritePlayers: favouritePlayersIds } =
    useContext(DataContext);

  const favouritePlayers = useMemo(() => {
    return (
      players?.filter((player) =>
        favouritePlayersIds.some(
          (favouritePlayerId) => player.id === favouritePlayerId.player_id,
        ),
      ) || []
    );
  }, [favouritePlayersIds, players]);

  if (players?.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: "25px",
        flexDirection: "column",
        width: "100%",
      }}
      data-testid="favourite-players-containers"
    >
      <Typography variant="h6" sx={{ width: "100%" }}>
        Favourite Players:{" "}
        {favouritePlayers.length === 0 && "No favourite players."}
      </Typography>
      <PlayerListContainer>
        {favouritePlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </PlayerListContainer>
    </Box>
  );
};

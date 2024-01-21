import { PlayerCard } from "../playerCard/PlayerCard";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { PlayerListContainer } from "./PlayerList.styles";
import { Box, Typography } from "@mui/material";

export const PlayerList = () => {
  const { activeTeam } = useContext(DataContext);

  if (!activeTeam.id || activeTeam.players.length === 0) {
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
    >
      <Typography variant="h6" sx={{ width: "100%" }}>
        Players from {activeTeam.name}:
      </Typography>
      <PlayerListContainer>
        {activeTeam.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </PlayerListContainer>
    </Box>
  );
};

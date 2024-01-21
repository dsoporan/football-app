import { PlayerCard } from "../playerCard/PlayerCard";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { PlayerListContainer } from "../playerList/PlayerList.styles";
import { Box, Typography } from "@mui/material";

export const CoachList = () => {
  const { activeTeam } = useContext(DataContext);

  if (!activeTeam.id || activeTeam.coaches.length === 0) {
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
        Coaches from {activeTeam.name}:
      </Typography>
      <PlayerListContainer>
        {activeTeam.coaches.map((player) => (
          <PlayerCard key={player.id} player={player} isCoach={true} />
        ))}
      </PlayerListContainer>
    </Box>
  );
};

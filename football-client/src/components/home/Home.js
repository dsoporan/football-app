import { Navbar } from "../navbar/Navbar";
import { SelectTeam } from "../selectTeam/SelectTeam";
import { LayoutContainer } from "./Home.styles";
import { Typography } from "@mui/material";
import { TeamDetails } from "../teamDetails/TeamDetails";
import { PlayerList } from "../playerList/PlayerList";
import { CoachList } from "../coachList/CoachList";
import { FavouritePlayerList } from "../FavouritePlayersList/FavouritePlayersList";

export const Home = () => {
  return (
    <>
      <Navbar />
      <LayoutContainer>
        <Typography variant="h6">
          Football Application - Details regarding 2022 Season
        </Typography>
        <SelectTeam />
        <TeamDetails />
        <PlayerList />
        <CoachList />
        <FavouritePlayerList />
      </LayoutContainer>
    </>
  );
};

import { List, ListSubheader, Typography } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import AbcIcon from "@mui/icons-material/Abc";
import BadgeIcon from "@mui/icons-material/Badge";
import FoundationIcon from "@mui/icons-material/Foundation";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import { Details, TeamDetailsContainer } from "./TeamDetails.styles";
import { ListItem } from "../listItem/ListItem";
import { MediaCard } from "../mediaCard/MediaCard";
import ManIcon from "@mui/icons-material/Man";
import StadiumIcon from "@mui/icons-material/Stadium";

export const TeamDetails = () => {
  const { activeTeam } = useContext(DataContext);

  return (
    <>
      {activeTeam?.id && (
        <TeamDetailsContainer data-testid="team-details-container">
          <Typography variant="h6" sx={{ width: "100%" }}>
            Details regarding {activeTeam.name} in 2022 Season
          </Typography>
          <Details>
            <img
              src={activeTeam.logo}
              alt={activeTeam.name}
              width={200}
              height={200}
            />
            <List
              sx={{
                width: "50%",
                bgcolor: "background.paper",
                "@media screen and (max-width: 768px)": {
                  width: "100%",
                },
              }}
              component="nav"
              aria-labelledby="team-details"
              subheader={
                <ListSubheader
                  component="div"
                  id="team-details"
                ></ListSubheader>
              }
            >
              {activeTeam.name && (
                <ListItem
                  icon={<BadgeIcon />}
                  label={"Name:"}
                  text={activeTeam.name}
                />
              )}
              {activeTeam.code && (
                <ListItem
                  icon={<AbcIcon />}
                  label={"Code:"}
                  text={activeTeam.code}
                />
              )}
              {activeTeam.country && (
                <ListItem
                  icon={<FlagIcon />}
                  label={"Country:"}
                  text={activeTeam.country}
                />
              )}
              {activeTeam.founded && (
                <ListItem
                  icon={<FoundationIcon />}
                  label={"Founded in:"}
                  text={activeTeam.founded}
                />
              )}
            </List>
            {activeTeam?.venue?.id && (
              <MediaCard
                image={activeTeam.venue.image}
                title={activeTeam.venue.name}
                subtitle={activeTeam.venue.address}
                leftDescription={
                  <>
                    <ManIcon />
                    {activeTeam.venue.capacity}
                  </>
                }
                rightDescription={
                  <>
                    <StadiumIcon />
                    {activeTeam.venue.surface}
                  </>
                }
              />
            )}
          </Details>
        </TeamDetailsContainer>
      )}
    </>
  );
};

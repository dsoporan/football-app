import fetch from "node-fetch";
import { buildBody } from "../utils/buildBody.js";
import { headersFootballAPI, leagueIDs } from "../utils/constants.js";

export const populateTeamsWithVenues = async (db) => {
  const Team = db.teams;
  const Venue = db.venues;

  for (const leagueID of leagueIDs) {
    const url = `https://v3.football.api-sports.io/teams?league=${leagueID}&season=2022`;
    const response = await fetch(url, {
      headers: headersFootballAPI,
    });
    const jsonResponse = await response.json();
    for (const teamElement of jsonResponse.response) {
      const isTeamPopulated = await Team.findByPk(teamElement.team.id);
      if (!isTeamPopulated) {
        await Team.create({
          ...buildBody(teamElement.team),
        });
      }
      const isVenuePopulated = await Venue.findByPk(teamElement.venue.id);
      if (!isVenuePopulated) {
        await Venue.create({
          ...buildBody(teamElement.venue),
          team_venue: teamElement.team.id,
        });
      }
    }
  }
};
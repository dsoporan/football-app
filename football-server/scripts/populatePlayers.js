import fetch from "node-fetch";
import { buildBody } from "../utils/buildBody.js";
import { headersFootballAPI, leagueIDs } from "../utils/constants.js";

export const populatePlayers = async (db) => {
  const Player = db.players;
  const Team = db.teams;

  for (const leagueID of leagueIDs) {
    const url = `https://v3.football.api-sports.io/players?league=${leagueID}&season=2022`;
    const response = await fetch(url, {
      headers: headersFootballAPI,
    });
    const jsonResponse = await response.json();
    for (const playerElement of jsonResponse.response) {
      const isPlayerPopulated = await Player.findByPk(playerElement.player.id);
      if (!isPlayerPopulated) {
        const teamExists = await Team.findByPk(
          playerElement.statistics?.[0].team.id,
        );
        await Player.create({
          ...buildBody(playerElement.player),
          team_players: teamExists
            ? playerElement.statistics?.[0].team.id
            : null,
        });
      }
    }
  }
};

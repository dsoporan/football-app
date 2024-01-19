import fetch from "node-fetch";
import { buildBody } from "../utils/buildBody.js";
import { headersFootballAPI } from "../utils/constants.js";

export const populateCoaches = async (db) => {
  const Coach = db.coaches;
  const Team = db.teams;

  const allTeams = await Team.findAll({ limit: 2 });

  for (const team of allTeams) {
    const url = `https://v3.football.api-sports.io/coachs?team=${team.id}`;
    const response = await fetch(url, {
      headers: headersFootballAPI,
    });
    const jsonResponse = await response.json();
    for (const coachElement of jsonResponse.response) {
      const isCoachPopulated = await Coach.findByPk(coachElement.id);
      if (!isCoachPopulated) {
        await Coach.create({
          ...buildBody(coachElement),
          team_coaches: coachElement.team.id,
        });
      }
    }
  }
};
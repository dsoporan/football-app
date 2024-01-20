import supertest from "supertest";
import app from "../index.js";
import { expect } from "chai";
import db from "../models/index.js";

const Team = db.teams;

const server = supertest.agent(app);

const team = {
  id: 1,
  name: "Manchester United",
  code: "MUN",
  country: "England",
  founded: 1878,
  national: false,
  logo: "https://media.api-sports.io/football/teams/33.png",
};

describe("Team", () => {
  describe("HTTP Requests", () => {
    before((done) => {
      Team.findByPk(team.id).then((team) => {
        if (team) {
          Team.destroy({
            where: {
              id: team.id,
            },
          }).then(() => {
            done();
          });
        } else {
          done();
        }
      });
    });

    it("/POST - it should NOT create a team since body is invalid", (done) => {
      server
        .post("/api/teams/create")
        .send({ ...team, national: "123" })
        .end((err, res) => {
          expect(res.body.errors[0]).to.deep.include({
            msg: "Invalid national, must be boolean",
          });
          expect(res.status).to.equal(422);
          done();
        });
    });

    it("/POST - it should create a team", (done) => {
      server
        .post("/api/teams/create")
        .send(team)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("/GET - it should GET all the teams", (done) => {
      server.get("/api/teams").end((err, res) => {
        const teamFound = res.body.teams.find(
          (teamElement) => teamElement.id === team.id,
        );
        expect(teamFound).to.deep.include(team);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/POST - it should NOT create a team since it exists already", (done) => {
      server
        .post("/api/teams/create")
        .send(team)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});

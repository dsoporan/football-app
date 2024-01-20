import supertest from "supertest";
import app from "../index.js";
import { expect } from "chai";
import db from "../models/index.js";

const Player = db.players;

const server = supertest.agent(app);

const player = {
  id: 1,
  name: "Neymar",
  firstname: "Neymar",
  lastname: "da Silva Santos Júnior",
  age: "28",
  nationality: "Brazil",
  height: "175 cm",
  weight: "68 kg",
  injured: false,
  photo: "https://media.api-sports.io/football/players/276.png",
};

describe("Player", () => {
  describe("HTTP Requests", () => {
    before((done) => {
      Player.findByPk(player.id).then((player) => {
        if (player) {
          Player.destroy({
            where: {
              id: player.id,
            },
          }).then(() => {
            done();
          });
        } else {
          done();
        }
      });
    });

    it("/POST - it should NOT create a player since body is invalid", (done) => {
      server
        .post("/api/players/create")
        .send({ ...player, weight: 123 })
        .end((err, res) => {
          expect(res.body.errors[0]).to.deep.include({
            msg: "Invalid weight, must be string",
          });
          expect(res.status).to.equal(422);
          done();
        });
    });

    it("/POST - it should create a player", (done) => {
      server
        .post("/api/players/create")
        .send(player)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("/GET - it should GET all the players", (done) => {
      server.get("/api/players").end((err, res) => {
        const playerFound = res.body.players.find(
          (playerElement) => playerElement.id === player.id,
        );
        expect(playerFound).to.deep.include(player);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/POST - it should NOT create a players since it exists already", (done) => {
      server
        .post("/api/players/create")
        .send(player)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});

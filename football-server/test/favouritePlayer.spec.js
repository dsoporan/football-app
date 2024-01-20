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

const favouritePlayer = {
  player_id: 1,
};

describe("Favourite Player", () => {
  describe("HTTP Requests", () => {
    before((done) => {
      Player.findByPk(player.id).then((player) => {
        if (!player) {
          Player.create({
            player,
          }).then(() => {
            done();
          });
        } else {
          done();
        }
      });
    });

    it("/POST - it should NOT create a favourite player since body is invalid", (done) => {
      server
        .post("/api/favourite-players/create")
        .send({})
        .end((err, res) => {
          expect(res.body.errors[0]).to.deep.include({
            msg: "player_id shouldn't be empty",
          });
          expect(res.status).to.equal(422);
          done();
        });
    });

    it("/POST - it should create a favourite player", (done) => {
      server
        .post("/api/favourite-players/create")
        .send(favouritePlayer)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("/GET - it should GET all the favourite players", (done) => {
      server.get("/api/favourite-players").end((err, res) => {
        const favouritePlayerFound = res.body.favouritePlayers.find(
          (favouritePlayerElement) =>
            favouritePlayerElement.player_id === favouritePlayer.player_id,
        );
        expect(favouritePlayerFound).to.deep.include(favouritePlayer);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/POST - it should NOT create a favourite player since it exists already", (done) => {
      server
        .post("/api/favourite-players/create")
        .send(favouritePlayer)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it("/DELETE - it should DELETE a favourite player", (done) => {
      server
        .delete(`/api/favourite-players/${favouritePlayer.player_id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

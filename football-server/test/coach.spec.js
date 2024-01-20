import supertest from "supertest";
import app from "../index.js";
import { expect } from "chai";
import db from "../models/index.js";

const Coach = db.coaches;

const server = supertest.agent(app);

const coach = {
  id: 1,
  name: "T. Tuchel",
  firstname: "Thomas",
  lastname: "Tuchel",
  age: "47",
  nationality: "Germany",
  height: "192 cm",
  weight: "85 kg",
  photo: "https://media.api-sports.io/football/coachs/40.png",
};

describe("Coach", () => {
  describe("HTTP Requests", () => {
    before((done) => {
      Coach.findByPk(coach.id).then((coach) => {
        if (coach) {
          Coach.destroy({
            where: {
              id: coach.id,
            },
          }).then(() => {
            done();
          });
        } else {
          done();
        }
      });
    });

    it("/POST - it should NOT create a coach since body is invalid", (done) => {
      server
        .post("/api/coaches/create")
        .send({ ...coach, weight: 123 })
        .end((err, res) => {
          expect(res.body.errors[0]).to.deep.include({
            msg: "Invalid weight, must be string",
          });
          expect(res.status).to.equal(422);
          done();
        });
    });

    it("/POST - it should create a coach", (done) => {
      server
        .post("/api/coaches/create")
        .send(coach)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("/GET - it should GET all the coaches", (done) => {
      server.get("/api/coaches").end((err, res) => {
        const coachFound = res.body.coaches.find(
          (coachElement) => coachElement.id === coach.id,
        );
        expect(coachFound).to.deep.include(coach);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it("/POST - it should NOT create a coach since it exists already", (done) => {
      server
        .post("/api/coaches/create")
        .send(coach)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});

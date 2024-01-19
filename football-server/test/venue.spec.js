import supertest from "supertest";
import app from "../index.js";
import { expect } from "chai";
import db from "../models/index.js";

const Venue = db.venues;

const server = supertest.agent(app);

const venue = {
  id: 1,
  name: "Santiago Bernabeu",
  address: "Spain",
  city: "Madrid",
  capacity: 83186,
  surface: "grass",
  image: "image",
};

describe("Venue", () => {
  describe("HTTP Requests", () => {
    before((done) => {
      Venue.findByPk(venue.id).then((venue) => {
        if (venue) {
          Venue.destroy({
            where: {
              id: venue.id,
            },
          }).then(() => {
            done();
          });
        } else {
          done();
        }
      });
    });

    it("/POST - it should create a venue", (done) => {
      server
        .post("/api/venues/create")
        .send(venue)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it("/GET - it should GET all the venues", (done) => {
      server
        .get("/api/venues")
        .expect(200)
        .end((err, res) => {
          const venueFound = res.body.venues.find((x) => x.id === venue.id);
          expect(venueFound).to.deep.include(venue);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

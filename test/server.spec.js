const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);


const { assert, expect } = chai;

describe("Cocktails Server", () => {

  it('Checks if /drinks sends \'Mojito\'', (done) => {
    chai
      .request(server)
      .get('/drinks')
      .end((err, res) => {
        expect(res.body.message).to.equal('Mojito');
        done();
      }); 
  });

  it('Checks /drinkMath', (done) => {
    chai
      .request(server)
      .get('/drinkMath')
      .end((err, res) => {
        expect(res.body.number).to.equal(150);
        done();
      }); 
  });
});
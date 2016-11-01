"use strict";

const chai = require("chai");
const expect = chai.expect;

const Author = require("../types/Author");
const getExistingAuthor = require("../getExistingAuthor");

return describe("getExistingAuthor", function () {

  const author1 = new Author("James", "Garner", "J");
  const author2 = new Author("Gordon", "Freeman", "G");
  const author3 = new Author("Graeme", "Norgate", "G");
  const authors = [
    author1,
    author2
  ];

  it("returns the author when an author exists", function (done) {
    expect(
      getExistingAuthor(authors, author1)
    ).to.equal(author1);
    return done();
  });

  it("returns null when an author doesn't exist", function (done) {
    expect(
      getExistingAuthor(authors, author3)
    ).to.equal(null);
    return done();
  });


});
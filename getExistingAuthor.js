"use strict";

const getExistingAuthor = function getExistingAuthor (authors, author) {
  return authors.find(existingAuthor => {
    return (
      existingAuthor.foreName === author.foreName &&
      existingAuthor.lastName === author.lastName &&
      existingAuthor.initials === author.initials
    );
  }) || null;
};

module.exports = getExistingAuthor;
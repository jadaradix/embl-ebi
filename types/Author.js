"use strict";

const Author = function Author (foreName, lastName, initials) {
  this.foreName = foreName;
  this.lastName = lastName;
  this.initials = initials;
};

Author.prototype.toString = function toString () {
  return `${this.lastName}, ${this.foreName}`;
};

module.exports = Author;
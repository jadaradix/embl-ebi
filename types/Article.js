"use strict";

const Article = function Article (title) {
  this.title = title || "[Article]";
  this.authors = [];
};

Article.prototype.addAuthor = function addAuthor (author) {
  this.authors.push(author);
};

Article.prototype.setTitle = function setTitle (title) {
  this.title = title;
};

Article.prototype.toString = function toString () {
  return this.title;
};

module.exports = Article;
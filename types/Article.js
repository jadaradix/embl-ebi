"use strict";

const Article = function Article (title) {
  this.title = title;
  this.authors = [];
};

Article.prototype.addAuthor = function addAuthor (author) {
  this.authors.push(author);
};

module.exports = Article;
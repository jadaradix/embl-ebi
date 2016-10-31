"use strict";

const Author = function Author (foreName, lastName, initials) {
  this.foreName = foreName;
  this.lastName = lastName;
  this.initials = initials;
};

Author.prototype.toString = function toString () {
  return `${this.lastName}, ${this.foreName}`;
};

const Article = function Article (title) {
  this.title = title;
  this.authors = [];
};

Article.prototype.addAuthor = function addAuthor (author) {
  this.authors.push(author);
};

// Dependencies
const fs = require("fs");
const libxmljs = require("libxmljs");
const Table = require("cli-table");

// XML -> String
const xml = fs.readFileSync("./data.xml").toString();

// XML -> DOM
const doc = libxmljs.parseXml(xml);

// DOM -> Article objects
const authors = [];
const articles = doc.find("//Article").map(domElement => {
  const articleTitleElement = domElement.get("ArticleTitle");
  const articleAuthorElements = domElement.find("AuthorList/Author");
  const article = new Article(articleTitleElement.text());
  articleAuthorElements.forEach(articleAuthorElement => {
    const author = new Author(
      articleAuthorElement.get("ForeName").text(),
      articleAuthorElement.get("LastName").text(),
      articleAuthorElement.get("Initials").text()
    );
    let existingAuthor = authors.find((existingAuthor) => {
      return (
        existingAuthor.foreName === author.foreName &&
        existingAuthor.lastName === author.lastName &&
        existingAuthor.initials === author.initials
      );
    });
    if (existingAuthor) {
      article.addAuthor(existingAuthor);
    } else {
      authors.push(author);
      article.addAuthor(author);
    }
  });
  return article;
});

const table = new Table(
  {
    head: [""].concat(
      authors.map(author => author.toString())
    )
  }
);
console.log(table.toString());
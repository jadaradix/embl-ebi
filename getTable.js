"use strict";

const Table = require("cli-table");

const getTable = function getTable (authors, articles) {
  const table = new Table(
    {
      head: [""].concat(
        authors.map(author => author.toString())
      )
    }
  );
  authors.forEach(columnWiseAuthor => {
    const o = {};
    o[columnWiseAuthor.toString()] = authors.map((rowWiseAuthor) => {
      const articlesByTheseAuthors = articles.filter(article => {
        return (
          article.authors.includes(columnWiseAuthor) &&
          article.authors.includes(rowWiseAuthor)
        );
      });
      return articlesByTheseAuthors.length;
    });
    table.push(o);
  });
  return table;
};

module.exports = getTable;
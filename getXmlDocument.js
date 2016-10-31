"use strict";

const fs = require("fs");
const libxmljs = require("libxmljs");

const getXmlDocument = function getXmlDocument (path) {
  const xml = fs.readFileSync(path).toString();
  const doc = libxmljs.parseXml(xml);
  return doc;
};

module.exports = getXmlDocument;
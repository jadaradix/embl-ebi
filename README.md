# Install
```
npm install
```

# Test
```
npm test
```

# Run
```
npm start
```

```
┌─────────────┬─────────────┬───────────┬───────────┬─────────────┐
│             │ Public, J Q │ Doe, John │ Doe, Jane │ Smith, John │
├─────────────┼─────────────┼───────────┼───────────┼─────────────┤
│ Public, J Q │ 2           │ 1         │ 1         │ 0           │
├─────────────┼─────────────┼───────────┼───────────┼─────────────┤
│ Doe, John   │ 1           │ 3         │ 1         │ 1           │
├─────────────┼─────────────┼───────────┼───────────┼─────────────┤
│ Doe, Jane   │ 1           │ 1         │ 2         │ 0           │
├─────────────┼─────────────┼───────────┼───────────┼─────────────┤
│ Smith, John │ 0           │ 1         │ 0         │ 1           │
└─────────────┴─────────────┴───────────┴───────────┴─────────────┘
```

# Answers

## 1: Output
See the "Run" section for a table generated with `cli-table`.

## 2: Testing

### Unit Testing

A unit test has been written for `getExistingAuthor` with `mocha` and `chai`. Both happy and unhappy paths are considered.

```
getExistingAuthor
  ✓ returns the author when an author exists
  ✓ returns null when an author doesn't exist
```

The full test suite would include unit tests for each abstracted function (not difficult since they are all "pure": they return the same output for given inputs and do not modify external state).

### Performance Testing

Ensure updates to the application logic do not severely impact performance on large data sets. On unix-like systems you can try this:

```
time npm start
real    0m0.545s
user    0m0.474s
sys     0m0.078s
```

In a better world, `chai` would be used to assert that for a given input file in a consistant environment, the run time does not fall outside of an upper bound.

### E2E Testing
End-to-End testing would cover the application login in `index.js` (integration of unit-tested modules including, for example, `getExistingAuthor`).

An End-to-End test would assert that for the provided XML data, the exact table text above is returned.

### Scalability
#### Language Choice
"Does it Scale?". No. There is a trade-off of elegance and performance in high-level languages like JavaScript and this solution prefers elegance for maintainability.

JavaScript is not the ideal language for optimised analysis of this data, but it exceeds Java in speed, portability, developer support and future prospects, and exceeds C++ in elegance.

For loops via `forEach` are also slow in concurrent node.js applications. Use of the `async` library's `eachSeries` function with promises or a callback chain would allow the "highest level caller" to return and exploit node.js' single-threaded power.

The performance of JavaScript VMs will only improve.

#### Algorithmic Complexity

The main issue is the algorithmic complexity of a "dual loop" (for each x and for each x). There are also multiple functional calls to `authors.map` and `authors.forEach`; these could be combined at the loss of good separation of concerns, especially in the table generation logic (`getTable.js`).

#### XML Parsing
`libxmljs` is used to parse XML and return a document which can be queried with XPath. It is a library described as "LibXML bindings for node.js", which means it binds V8 to `libxml`'s C/C++ header exposure. This makes performance excellent, however, `libxml` is an all-round library which handles syntax errors and many edge cases which are not important for us. A more specific and optimised way to parse an XML string would further increase performance if the structure and correctness of the XML document were guaranteed.

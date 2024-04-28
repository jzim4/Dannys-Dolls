// ./node_modules/.bin/browserify ./js/contentful.js -o bundle.js

const contentful = require('contentful')
const script = require('./script.js')

const client = contentful.createClient({
  space: '321b739feokm',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'vjvHhmdNkUZVDfDDWDErJmqHBa4JEVRUtNb2Yekry5U'
})

var clothes = [];
var dolls = [];

client.getEntries({
  skip: 100,
  limit: 1000
}).then(function (entries) {
  entries.items.forEach(function (entry) {
    if (entry.sys.contentType.sys.id == "clothes") {
      clothes.push(entry.fields);
    }
    else if (entry.sys.contentType.sys.id == "doll") {
      dolls.push(entry.fields);
    }
  });
  script(clothes, dolls);
});
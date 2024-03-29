const contentful = require('contentful')
const script = require('./script.js')

const client = contentful.createClient({
  space: '321b739feokm',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'vjvHhmdNkUZVDfDDWDErJmqHBa4JEVRUtNb2Yekry5U'
})

client.getEntries().then(function (entries) {
  entries.items.forEach(function (entry) {
      console.log(entry.fields.manufacturer);
  });
  script();
});



  // // log the title for all the entries that have it
  // entries.items.forEach(function (entry) {
  //   addContent(entry.fields.manufacturer);
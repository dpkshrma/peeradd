const getUsage = require('command-line-usage');
const { optionDefinitions } = require('./options');

const sections = [
  {
    header: 'Peer Add',
    content: 'Install peer dependencies without any fuss',
  },
  {
    header: 'Options',
    optionList: optionDefinitions,
  },
];

module.exports = getUsage(sections);

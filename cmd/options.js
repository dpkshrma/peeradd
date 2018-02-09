const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  {
    name: 'dev',
    alias: 'd',
    type: Boolean,
    multiple: true,
    description: 'Save peer dependencies as dev dependencies',
  },
  {
    name: 'use-yarn',
    alias: 'y',
    type: Boolean,
    defaultValue: false,
    description: 'Tells whether to use yarn as the package manager for installing dependencies. Default: false',
  },
  {
    name: 'help',
    description: 'Print this usage guide.',
  },
];
const options = commandLineArgs(optionDefinitions, { partial: true });

exports.getOptions = () => options;
exports.optionDefinitions = optionDefinitions;

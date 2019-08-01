#!/usr/bin/env node
import program from 'commander';
import diff from '../diff';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(diff(firstConfig, secondConfig));
  })
  .parse(process.argv);

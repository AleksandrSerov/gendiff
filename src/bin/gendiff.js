#!/usr/bin/env node
import program from 'commander';
import diff from '../diff';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(diff)
  .parse(process.argv);

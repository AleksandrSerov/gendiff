#!/usr/bin/env node
const program = require("commander");

program
  .version("0.0.1")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "Output format")
  .arguments("<firstConfig> <secondConfig>")
  .action(function(firstConfig, secondConfig) {
    console.log(firstConfig, secondConfig);
  })
  .parse(process.argv);

if (program.format) {
  console.log(program.format);
}

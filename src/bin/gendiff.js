#!/usr/bin/env node

import program from "commander";

program
  .version("0.0.1", "-v, --version")
  .description("Compares two configuration files and shows a difference.");

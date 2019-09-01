# Gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/a0fe078a898e94a6e560/maintainability)](https://codeclimate.com/github/AleksandrSerov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a0fe078a898e94a6e560/test_coverage)](https://codeclimate.com/github/AleksandrSerov/frontend-project-lvl2/test_coverage)
[![Build Status](https://travis-ci.org/AleksandrSerov/gendiff.svg?branch=master)](https://travis-ci.org/AleksandrSerov/gendiff)
## Description

Utility for finding differences in configuration files.

Utility features:

- Support for different formats(json, yml, ini)
- Report generation as plain text, pretty and json

Usage example:

```bash
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

## Installation

```bash
git clone https://github.com/AleksandrSerov/frontend-project-lvl2.git
cd frontend-project-lvl2
make install
```

## Publish package

```bash
make publish
```

## Installation package

```bash
sudo npm link
```

## Scripts

- `make install` - Install dependences
- `make publish` - Publish project
- `make watch` - Start tests in watch mode
- `make test` - Start tests
- `make lint` - Start lint
- `make start` - Start project

## Demo

### Flat configs

![Flat](demo/flat.gif)

### Nested configs

![Nested](demo/nested.gif)

### Formats

![formats](demo/formats.gif)

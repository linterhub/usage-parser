# @linterhub/usage-parser [![travis][shield-travis]][travis-url] [![semantic][shield-semantic]][semantic-url] [![npm][shield-npm]][npm-url] [![github][shield-github]][repo-url]

> Simple parser for usage page in CLI

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Background

There are a lot of CLI with different usage doc, distributed in different ways.
This repository contains a proposal to unified format for arguments
of various CLI. Under the hood, the main idea is pretty similar
to [docopt][docopt-url] approach.

> More details in [doс][doc-url] or at [the catalog page][catalog-url]

## Install

Requirements:

- [Node.js][node-js] 4+

```bash
npm install @linterhub/usage-parser
```

### GitHub

All releases and the source code are available for download
at [GitHub Releases][repo-release-url].

## Usage

Parse help doc and output result to console:

### JavaScript

```javascript
const parser = require('@linterhub/usage-parser');
console.log(parser('help doc'));
```

### CLI

Before run add './node_modules/.bin/usage-parser' to script in package.json

```bash
npm run parse "help doc"
```

## Contribute

You may contribute in several ways like requesting new features,
adding tests, fixing bugs, improving documentation or examples.
Please check our [contributing guidelines][repo-contributing].

## License

[MIT][repo-license]

[repo-doc]: https://github.com/linterhub/usage-parser/blob/develop/doc
[repo-url]: https://github.com/linterhub/usage-parser
[repo-license]: https://github.com/linterhub/usage-parser/blob/master/LICENSE.md
[repo-release-url]: https://github.com/linterhub/usage-parser/releases
[repo-contributing]: https://github.com/linterhub/usage-parser/blob/master/.github/CONTRIBUTING.md
[shield-npm]: https://img.shields.io/npm/v/@linterhub/usage-parser.svg
[shield-github]: https://img.shields.io/github/release/linterhub/usage-parser.svg?label=github
[shield-travis]: https://img.shields.io/travis/linterhub/usage-parser/master.svg
[shield-semantic]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[npm-url]: https://www.npmjs.com/package/@linterhub/usage-parser
[docopt-url]: http://docopt.org
[travis-url]: https://travis-ci.org/linterhub/usage-parser/branches
[node-js-url]: https://nodejs.org
[catalog-url]: https://github.com/linterhub/catalog
[semantic-url]: https://github.com/semantic-release/semantic-release

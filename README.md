# raml2html-full-markdown-theme [![NPM version][npm-image]][npm-url]

> Render the RAML API spec in the slate documentation layout using raml2html

This package provides a theme for [raml2html](https://github.com/raml2html/raml2html). It is meant to render a Markdown documentation for your REST API, based on a RAML file.
The theme is based on the code of [raml2html-slate-theme](https://github.com/wdullaer/raml2html-slate-theme).

The theme supports customizable templates. The default template is most suitable to use with [Slate](https://github.com/slatedocs/slate). Most RAML features are supported.


## Installation

```sh
$ npm install -g raml2html-full-markdown-theme
```

## Usage
In javascript:
```js
const raml2html = require('raml2html');
const mdConfig = raml2html.getConfigForTheme('raml2html-full-markdown-theme', options);

// source can be a filename, url or parsed RAML object
const source = 'path/to/raml/file'
raml2html.render(source, slateConfig)
  .then((html) => console.log(html))
  .catch((error) => console.error(error))
```

On the command line:
```bash
raml2html \
--theme 'raml2html-full-markdown-theme' \
-o 'path/to/output/file.html' \
-i 'path/to/raml/file.raml'
```

## Options

* *--template-dir* The path to custom templates directory. If omited — the default template is used.

## License

MIT © [Wouter Dullaert](https://wdullaer.com)


[npm-image]: https://badge.fury.io/js/raml2html-full-markdown-theme.svg
[npm-url]: https://npmjs.org/package/raml2html-full-markdown-theme

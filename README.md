# raml2html-full-markdown-theme [![NPM version][npm-image]][npm-url]

> Render the RAML API spec in the slate documentation layout using raml2html

This package provides a theme for [raml2html](https://github.com/raml2html/raml2html). It is meant to render a Markdown documentation for your REST API, based on a RAML file.
The theme is based on the code of [raml2html-slate-theme](https://github.com/wdullaer/raml2html-slate-theme).

The theme supports customizable templates. The default template is most suitable to use with [Slate](https://github.com/slatedocs/slate). You can also find some alternative templates in the **alternative_templates** folder. You will need to copy them into your project directory and use `template-dir` option.

The theme is called **full** Markdown theme because it includes much more fields from the RAML specification than the original [raml2html-markdown-theme](https://www.npmjs.com/package/raml2html-markdown-theme).

## Installation

```sh
$ npm install -g raml2html-full-markdown-theme
```

## Usage

In javascript:

```js
const raml2html = require('raml2html');
const options = {'template-dir': 'templates'}
const mdConfig = raml2html.getConfigForTheme('raml2html-full-markdown-theme', options);

// source can be a filename, url or parsed RAML object
const source = 'path/to/raml/file'
raml2html.render(source, mdConfig).then((html) => console.log(html)).catch((error) => console.error(error))
```

On the command line:

```bash
raml2html \
--theme 'raml2html-full-markdown-theme' \
-o 'path/to/output/file.md' \
-i 'path/to/raml/file.raml' \
--template-dir 'templates'
```

## Options

* *--template-dir* The path to custom templates directory. If omitted — the default template is used.


[npm-image]: https://badge.fury.io/js/raml2html-full-markdown-theme.svg
[npm-url]: https://npmjs.org/package/raml2html-full-markdown-theme

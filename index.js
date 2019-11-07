'use strict'
let fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')

const getCurlStatement = require(path.join(__dirname, 'lib/stylus-globals.js')).getCurlStatement
const getLanguage = require(path.join(__dirname, 'lib/stylus-globals.js')).getLanguage
const getResponseHeaders = require(path.join(__dirname, 'lib/stylus-globals.js')).getResponseHeaders
const getSafeId = require(path.join(__dirname, 'lib/stylus-globals.js')).getSafeId
const hasExamples = require(path.join(__dirname, 'lib/stylus-globals.js')).hasExamples
const getTypeDefinitions = require(path.join(__dirname, 'lib/stylus-globals.js')).getTypeDefinitions
const hasType = require(path.join(__dirname, 'lib/stylus-globals.js')).hasType
const getType = require(path.join(__dirname, 'lib/stylus-globals.js')).getType

const defaultTemplatesDir = path.join(__dirname, 'templates')

/**
 * Cleans up Markdown string from trailing spaces and excessive line breaks.
 * @param  {string}  input A Markdown string
 * @return {string}  A cleaned up Markdown string
 */
function cleanupMarkdown(input) {
  const trailingSpaces = / +\n/g
  const excessiveNewLines = /\n{3,}/g

  var result = input.replace(trailingSpaces, '\n')
  result = result.replace(excessiveNewLines, '\n\n')
  return result
}

/**
 * Renders a parsed RAML object into the templateDir
 * @param  {object}          ramlObj A parsed RAML object as produced by raml2obj
 * @param  {object}          config  A map with raml2html configuration
 * @param  {object}          options A map with command line options
 * @return {Promise<string>}         A Promise resolving to Markdown as a string
 */
 module.exports = {
  processRamlObj (ramlObj, config, options) {
    var templateDir
    if ((options.templateDir) && (fs.existsSync(options.templateDir))) {
      templateDir = path.resolve(options.templateDir)
    }
    else {
      if (options.templateDir) {
        console.log('Template dir not found: ' + options.templateDir + '. Using default')
      }
      templateDir = defaultTemplatesDir
    }

    const template = path.join(templateDir, 'root.nunjucks')
    const env = nunjucks
      .configure(templateDir, {autoescape: false})
      .addGlobal('getSafeId', getSafeId)
      .addGlobal('getLanguage', getLanguage)
      .addGlobal('getResponseHeaders', getResponseHeaders)
      .addGlobal('getCurlStatement', getCurlStatement.bind(null, ramlObj.securitySchemes, ramlObj.baseUri))
      .addGlobal('hasExamples', hasExamples)
      .addGlobal('getTypeDefinitions', getTypeDefinitions)
      .addGlobal('hasType', hasType)
      .addGlobal('getType', getType)

    return new Promise((resolve) => {
      var result = env.render(template, ramlObj)
      result = cleanupMarkdown(result)
      return resolve(result)
    })
  }
}

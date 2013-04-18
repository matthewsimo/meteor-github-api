How this works:

- The app uses the `XML2JS` global, which is defined in the xml2js
  package.

- The xml2js package is defined in packages/. All subdirectories of
  packages/ are treated as packages to be automatically added to your
  app.

- packages/xml2js/package.js describes the package, with its NPM
  dependencies and the list of files to load (namely xml2js.js).

- packages/xml2js/xml2js.js wraps an asyncronous node module in a
  synchronous api, using Futures.

Package.describe({
  summary: 'NodeJS wrapper for the GitHub API'
});

Npm.depends({github: '0.1.10'});

Package.on_use(function (api) {
  api.export('GitHub');

  api.add_files('github-api.js', 'server');
});

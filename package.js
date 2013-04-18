Package.describe({
  summary: "NodeJS wrapper for the GitHub API"
});

Npm.depends({github: "0.1.8"});

Package.on_use(function (api) {
  api.add_files("github.js", "server");
});

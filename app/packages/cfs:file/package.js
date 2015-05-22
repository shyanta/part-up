Package.describe({
  git: 'https://github.com/CollectionFS/Meteor-cfs-file.git',
  name: 'cfs:file',
  version: '0.1.17',
  summary: 'CollectionFS, FS.File object'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'cfs:base-package@0.0.30',
    'cfs:storage-adapter@0.2.1',
    'tracker',
    'check',
    'ddp',
    'mongo',
    'http',
    'cfs:data-man@0.0.6',
    'raix:eventemitter@0.1.1'
  ]);

  api.addFiles([
    'fsFile-common.js'
  ], 'client');

  api.addFiles([
    'fsFile-common.js',
    'fsFile-server.js'
  ], 'server');
});

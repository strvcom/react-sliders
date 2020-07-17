'use strict'

module.exports = {
  tagFormat: '${version}',
  branches: [{ name: 'release/latest', channel: 'latest' }],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: '.',
      },
    ],
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        assets: [{ path: '*.tgz', label: '@strv/react-sliders.tgz' }],
      },
    ],
  ],
}

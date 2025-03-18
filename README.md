# @praha/create-tsp

[![npm version](https://badge.fury.io/js/@praha%2Fcreate-tsp.svg)](https://www.npmjs.com/package/@praha/create-tsp)
[![npm download](https://img.shields.io/npm/dm/@praha/create-tsp.svg)](https://www.npmjs.com/package/@praha/create-tsp)
[![license](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/praha-inc/tsp/blob/main/LICENSE)
[![Github](https://img.shields.io/github/followers/praha-inc?label=Follow&logo=github&style=social)](https://github.com/orgs/praha-inc/followers)

## 👏 Getting Started

Follow these steps to set up your TypeScript CLI project and begin development.

### Create a Repository on GitHub

Go to https://github.com/new and create a new repository.

Please create the repository **without** a README, .gitignore, and license file.
These files will be generated automatically later by `@praha/tsp`.

### Initialize the Project

Navigate to the directory where you want to create the project and execute the following command.

```bash
npm create @praha/tsp@latest
```

> [!WARNING]
> Be sure to specify the latest version when running `@praha/tsp`.
> If you do not specify the version, an older version from a previous execution may run instead.

Follow the on-screen prompts to configure your project settings.  
This might include naming your project, selecting templates, and setting other options according to the CLI prompts.

### Install GitHub Apps

Adding these tools will help you automate dependency updates and manage versioning/releases.

#### Install Renovate

Renovate is a tool that helps you keep your dependencies up to date.

Go to the [Renovate installation page](https://github.com/apps/renovate) and install Renovate App in your repository.  
If you want to automatically merge PRs submitted by Renovate, please also install the following two apps.

- [Renovate Approve](https://github.com/apps/renovate-approve)
- [Renovate Approve 2](https://github.com/apps/renovate-approve-2)

These apps will automatically approve PRs submitted by Renovate, facilitating automatic merging.

#### Install Changesets

Changesets is a tool that helps you manage versioning and releases.

Go to the [Changeset installation page](https://github.com/apps/changeset-bot) and install Changeset Bot in your repository.  
By installing this bot, you will receive a warning if you submit a PR without adding a changeset.

#### Setup NPM Token

Although changesets publishes packages automatically, you must set up an NPM token to publish packages to npm.

Create an NPM token by following the instructions in the link below.  
https://docs.npmjs.com/creating-and-viewing-access-tokens

After creating the token, go to the repository settings on GitHub and create a secret named `NPM_TOKEN` with the token you created.

For more information on creating secrets, see the link below.  
https://docs.github.com/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository

#### Install pkg.pr.new

pkg.pr.new is a tool that aids in the release of development versions of packages.

Go to the [pkg.pr.new installation page](https://github.com/apps/pkg-pr-new) and install pkg.pr.new in your repository.  
With this bot installed, you can automatically release a development version of your package by submitting a PR.

### Develop the Package

Once your project is initialized and the necessary GitHub Apps are installed, you can start developing your package.  
When you are ready to release your package, merge the PR created by Changeset.  
This will automatically release a new version of your package.

## 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to check [issues page](https://github.com/praha-inc/tsp/issues) if you want to contribute.

## 📝 License

Copyright © [PrAha, Inc.](https://www.praha-inc.com/)

This project is [```MIT```](https://github.com/praha-inc/tsp/blob/main/LICENSE) licensed.

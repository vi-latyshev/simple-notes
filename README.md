This project is based on [old project with CRA](https://github.com/vi-latyshev/megapolis-it-test).

# Simple Notes

## Sections
1. [Links](#links)
1. [Requirements](#requirements)
1. [Technology stack](#technology-stack)
1. [Browsers support](#browsers-support)
1. [Install](#install)
1. [Start developing](#start-developing)
1. [Scripts commands](#scripts-commands)
1. [Structure](#structure)
1. [Developing steps](#developing-steps)
    * [Branches](#branches)
    * [Commits](#commits)
        * [Examples](#examples)
    * [Pull Requests](#pull-requests)

## Links

### Site urls:

* https://simple-notes-vi.vercel.app/

## Requirements

* node `^15.0.0` - [install](https://nodejs.org/en/download/)
* yarn `^1.22.0` - [install](https://yarnpkg.com/en/docs/install/)

## Technology stack

* [React 16.8+](https://reactjs.org/) ─ base of app. Using functional components with hooks
* [Next.js](https://nextjs.org/) ─ framework for ssr and api
* [Typescript](https://www.typescriptlang.org/) - static type definitions
* [Material-UI](https://material-ui.com/) ─ components of user interface
* [axios](https://github.com/axios/axios) ─ xhr requests

## Browsers support

Consider the minimum supported browser versions while developing:

* Internet Explorer **10+**
* Google Chrome **23+**
* Mozilla Firefox **21+**
* Safari **6+**

## Install

Clone project from repository and install all project's dependencies:

```bash
git clone git@github.com/vi-latyshev/simple-notes
cd simple-notes
yarn
```

## Start developing

Runs which starts Next.js in development mode:
```bash
yarn dev
```
This starts the development server on http://localhost:3000.

## Scripts commands

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`              |Run app in develop mode|
|`test`             |Run lint for type code check, and code test|
|`build`            |[Build app](#build) in production mode|
|`start`            |[Build and start app](#start-app) in production mode|

## Structure

### The project structure has both flat and [fractal structure](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure)s.

**Important!** - Top-level `components`, `hooks`, `utils` and `icons` directories contain reusable components

```
|── public                      # static files (icons, images, robots.txt and etc)
|── src                         # all source files
|   |── components              # common reuseble components
|   |── configs                 # server/client configs (routes, csp and etc)
|   |── constants               # frontend constants (links, contacts, socials and etc)
|   |── hooks                   # common reuseble hooks
|   |── icons                   # common reuseble icons
|   |── pages                   # names of pages for routing
|   |   |── _app.tsx            # 'head layout' of page. Used by Next.js
|   |   |── _document.tsx       # 'head layout' of all pages, uses server-side rendering. Used by Next.js
|   |   |── index.tsx           # home page, includes all sections/components from `./views/home`
|   |   └── about.tsx           # some any page, includes all sections/components from `./views/about`
|   |── styles                  # settings theme for material-ui
|   |── types                   # types of node_modules libs for redeclaration
|   └── views                   # includes all `components`, `hooks`, `utils` and `icons` used only on specific page
|       |── home                # name of page
|       |   |── hooks           # hooks only for 'home' page
|       |   |── icons           # icons only for 'home' page
|       |   |── index.ts        # all exports components/interfaces for importing components of 'home' page
|       |   └── List.tsx        # some any component
|       └── about               # some any page
└──
```

Within of a fractal structure, an example of a list component might look like this:

```
…
|   |── SmthList
|   |   |── index.ts            # all exports components/interfaces for importing this component
|   |   |── SmthList.tsx        # includes all logic of component
|   |   |── constants.ts        # constants for this component, mostly to avoid circular dependencies
|   |   |── utils               # some utilities различные вспомогательные утилиты
|   |   |   └── smthFormatter.ts
|   |   └── Row                 # component representing list line
|   |       |── index.tx        # all exports components/interfaces for importing list line
|   |       └── Row.tsx         # includes all logic of list line
…
```

## Developing steps

### Branches

The process of adding new functionality begins by creating a new branch for development, branching from the `develop` branch. The name prefix for the branch is selected based on the type of added functionality:

* `feat` ─ adding new user features
* `fix` ─ fixing bugs
* `chore` ─ adding / updating new features that with doesn't affect user code. Example, optimizing package builds, code rules and etc
* `docs` ─ documentation

Then comes the `/` character and a short associative name in `kebab-case`.

So, for example, the name of the branch for adding the change new header may have the name: `feat/new-header`.

### Commits

Comments to commits are formatted to the following rule:

```
<type>: <subject>
```

#### Type

* `feat` - using for adding new feature
* `fix` - fixing some bug
* `docs` - add or update docs
* `test` - add or update tests for app
* `chore` - optimizing package builds, code rules and etc

#### Subject

Common style message:

```
action (with lower case) + for which entity + (optional details)
```

For example:
```
fix margin in button
```

#### Examples commmits:

```
feat: add phone in contact
fix: fix shadow for modal
chore: add rewrite for redirect in next config
```

### Pull Requests

The development process ends with a Pull Request of the development branch in the `master` or other base branch of project.
* If the base branch has gone ahead during development, it is necessary to `rebase` from it.
* After approved PR, it is necessary to `squash and merge` with base branch and `delete` development branch.

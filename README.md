
# Cupcake boilerplate

A mono stack (typescript) boilerplate for fullstack development.


## Overview

This boilerplate is a use case of combining React JS with Server Side Rendering (Next JS framework), Redux with Redux-Dynamic-Modules as a state management system and backend Node.js framework NestJS. It could serve as a starter kit for development of medium size and large projects.


## What we used

Development Tools:



*   Lerna
*   Eslint
*   Prettier

Frontend:



*   Next JS
*   React JS
*   Redux
*   Redux-Dynamic-Modules
*   Redux-Saga
*   Styled Components

Backend:



*   Nest JS
*   TypeORM
*   Passport JS


## Motivation

Nowadays, a lot of commercial projects require the SEO and performance optimization. Additionally, it’s necessary to have code splitting for large projects. Frameworks and libraries that we used for Cupcake boilerplate were selected according these requirements.

So, Next JS has all benefits that come with React JS and helps us with server side rendering and routing, also it has automatic code splitting for faster page loading.

For state management we decided to use the most popular library - Redux, but we added Redux Dynamic Modules as a tool for code splitting. Thus, Redux modules (reducers and middleware) can be dynamically added or removed to the Redux store at runtime. Also it can be reused if our customer want to make a mobile application.

On the server-side, we need a framework that helps to build scalable, easily maintainable, well testable applications. Nest JS is ideal candidate for this work, because it provides a great application architecture out of the box and has a support of the other popular libraries such as TypeORM or Passport JS.

And last but not least, Lerna is a perfect tool for managing projects and organizing their codebases into mono-repository, that allows to share node_modules among our packages.

Combining all these technologies helps us to develop modern and scalable projects, which meet our clients’ requirements.


## Getting Started

If you wanna use Cupcake boilerplate for developing your project, then this recipe is for you:



*   Clone this repository
*   Run `yarn install or lerna bootstrap` (if you have lerna globally) from the root folder
*   Run `yarn start:dev` from the root folder (it runs dev servers and watchers of every project package) or run this command individually from any project package folder
*   Then you can start developing


### Project structure

Cupcake Boilerplate has the following structure:



*   `root_folder`
    *   `|_ packages`
        *   `|_ server`
            *   `|_ api`
        *   `|_ web`
            *   `|_ frontend`
            *   `|_ core`
            *   `|_ other_project_packages...`
        *   `|_ common (optional)`

The `root_folder` contains config files and common `node_modules`.

Every folder in `server`, `web` or `common` directories is a lerna package. 

So, `api` is a backend application on Nest JS. 

The `frontend` folder is a Next JS web application. 

The `core` package is the main module where Redux store is created. 

Other packages contains independent Redux modules and common functions. 


### How to add a new package?

You can create a folder in one of the `server`, `web` or `common` directories and initialize package with `npm/yarn init` command. Then you can add npm package according to [lerna guide](https://github.com/lerna/lerna/tree/master/commands/add#readme).


### Redux and its modules

Web Core is a package that contains Redux Store initialization. `makeStore` function is the place where default Redux modules can be added. Also Web Core package provides HOC `withReduxDynamicModules` which accepts `PageComponent` and a list of Redux modules that should be added when this page will be opened.

All Redux modules are located in separate packages, so it’s easy to maintain and extend the codebase.


### Authentication

Cupcake Boilerplate has the built in authentication feature. It uses Passport JS library. We implemented local and JWT strategies and extended them by addition of the refresh token that helps to persist authentication without sessions.


## License

MIT
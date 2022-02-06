# `React Typescript Starter `

## `React Typescript Starter Web Application`

<hr/>

This project is created with the following main libraries:

| Library                                                              | Purpose                                               |
| -------------------------------------------------------------------- | ----------------------------------------------------- |
| [@Emotion/React](https://emotion.sh/docs/@emotion/react              | Simple styling in React                               |
| [@Emotion/Styled](https://emotion.sh/docs/@emotion/styled)           | Styled API for @Emotion/React                         |
| [@Mui/Icon-Material](https://mui.com/components/material-icons/      | React Material icons                                  |
| [@Mui/Material](https://mui.com/)                                    | React UI Library                                      |
| [@ReduxJS/toolkit](https://redux-toolkit.js.org/)                    | Redux development toolset                             |
| [Axios](https://github.com/axios/axios#readme)                       | Promise based HTTP client for the browser and node.js |
| [React](https://reactjs.org/)                                        | Javascript library for building UI                    |
| [React-Dom](https://reactjs.org/docs/react-dom.html)                 | DOM specific adapter for react UI                     |
| [React-Redux](https://react-redux.js.org/)                           | React bindings for redux                              |
| [React-Scripts](https://github.com/facebook/create-react-app#readme) | React with pre-loaded configuration generator         |
| [Lodash](https://lodash.com/)                                        | Javascript utility library                            |
| [React-Slick](https://react-slick.neostack.com/                      | jQuery slick library                                  |
| [Slick-Carousel](https://github.com/kenwheeler/slick#readme)         | Slick based carousel                                  |
| [Validator](https://github.com/validatorjs/validator.js#readme)      | Javascript string validators and sanitizers           |

### Development

| Library                                                                                 | Description                                  |
| --------------------------------------------------------------------------------------- | -------------------------------------------- |
| [@Craco/Craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md) | Create React App configration override layer |
| [@Testing-Library/Jest-Dom](https://testing-library.com/docs/ecosystem-jest-dom/)       | Custom DOM matching library                  |
| [@Testing-Library/React](https://testing-library.com/docs/react-testing-library/intro/) | DOM testing library                          |
| [@Testing-Library/User-Event](https://testing-library.com/docs/ecosystem-user-event/)   | Browser simulation library                   |
| [Husky](https://github.com/typicode/husky/blob/main/README.md)                          | Modern native Git hooks made easy            |
| [Lint-Staged](https://github.com/okonet/lint-staged/blob/master/README.md)              | Run linters against staged git files         |
| [Prettier](https://prettier.io/)                                                        | An opinionated code formatter                |
| [Typescript](https://www.typescriptlang.org/)                                           | Superset syntax for Javascript               |

<hr/>

## `Getting started`

<hr/>

### 1. Checkout / Download Source Code

To get a running copy on your local instance, checkout or download a copy of the repository from [React-Typescript-Starter](https://github.com/adamchew89/react-typescript-starter).

If you do not have access to the continental github repository above, kindly contact the administrator(s) for permission:

- Adam Chew <adamchew89@gmail.com>
- Stoche Media <stochemedia@gmail.com>

<hr/>

### 2. Dependencies Installation

To complete the following instructions, [Node.js](https://nodejs.org/en/) must be installed on your terminal.

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start installing the project dependencies: `npm install` or `npm i`

<hr/>

### 3. Setting-up Local Environment Variables

The following instructions will create an environment variable file for local use:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to copy a environmental variable file template: `cp .env .env.development`
- Open and modify the values contained within the file to your requirement.
- Ensure that an existing database is running for this segment to work.

<hr/>

### 4. Start Application

The following instructions will start hosting the application locally:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start a development server locally: `yarn start`
- Execute the following command to start a production server locally: `yarn start:prod`

<hr/>

### 5. Build Production Version

The following instructions will compile the source codes into a production-ready version:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to build and compile the source codes: `npm run build`

<hr/>

### 6. Unit Testing

The following instructions will start a unit test process on the application:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start the unit test process: `npm run test:local`
- Open a browser tab (Google Chrome recommended) and proceed to the following url to view the coverage report: `~/<project-root-folder>/coverage/lcov-report/index.html`

<hr/>

### 7. API Documentation

The following instructions will enable the viewing of the OpenAPI documentation:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start the development server: `npm run dev`
- Open a browser tab (Google Chrome recommended) and proceed to the following url to view the OpenAPI documentation: `http://localhost:<port>/api-docs`

<hr />

### 8. Database Migration/Seeding

The following instructions will enable the migration of database structure and seeding of data to database tables:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start the development server: `npm run dev`
- Upon successfully starting the server, a new configuration file will be generated on the project root directory: `config.json`
- Execute the following command to start migrating database structures into the database: `npx sequelize-cli db:migrate`
- Execute the following command to start seeding data into the database: `npx sequelize-cli db:seed:all`

<hr />

### 9. Containerization

The following instructions will enable the containerization of the application:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start the image building process: `docker build -t expressts-starter-image .`
- Execute the following command to start the container building process: `docker run -it --publish 3000:3000 --rm --name expressts-starter-container expressts-starter-image`

<hr />

### 10. Kubernetes Deployment

> All container images will need to be build before proceeding to this segment.
> Images include:
>
> - expressts-starter:v1 (To be built in target production environment. Hence, ensure values in `.env.production` are correct.)
> - mysql (From docker hub)
> - rabbitmq:3.8.14 (From docker hub)
> - redis (From docker hub - Future use)

The following instructions will deploy the application onto a kubernetes cluster:

- Navigate from your preferred command line interface (CLI) tool to the application's root directory: `cd ~/<project-root-folder>`
- Execute the following command to start the secrets deployment process. Commands are found in `~/<project-root-folder>/kubernetes/secrets/README.md`
- Execute the following command to start the volumes deployment process: `kubectl apply -f ./kubernetes/volumes/`
- Execute the following command to start the containers deployment process: `kubectl apply -f ./kubernetes/deployments/`
- Execute the following command to start the services deployment process: `kubectl apply -f ./kubernetes/services/`
- Execute the following url address on a browser to verify expressts-starter deployment: `http://localhost/api/api-docs`

- Execute the following command to start the dashboard deployment process: Commands are found in `~/<project-root-folder>/kubernetes/deployments/README.md`
- Execute the following command to start the dashboard proxy process: `kubectl proxy`
- Execute the following url address on a browser to verify: `http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/`

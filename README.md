
# Breadfast Frontend Technical Challenge

This is a ReactJS application built with Next.js and TypeScript, showcasing various features such as lazy loading images, custom hooks, and data persistence.

## Installation and Running the Application Locally

To get started with the project, follow these instructions:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/breadfast-frontend-technical-challenge.git
cd breadfast-frontend-technical-challenge
```

### Install Dependencies

Run the following command to install the required npm packages:

```bash
npm install
```

### Run the Application

Once the dependencies are installed, you can run the application in development mode:

```bash
npm run dev
```

The application will be running on `http://localhost:3000`. Open this URL in your browser to view the app.

### Build for Production

To build the application for production, use the following command:

```bash
npm run build
```

After the build process is complete, you can start the production server with:

```bash
npm start
```

### Running Tests

This application uses Jest for testing. To run the tests, execute:

```bash
npm test
```

## Features

- **Lazy Loading Images**: Optimizes image loading for better performance.
- **Custom Hooks**: Provides reusable logic for managing state and effects.
- **Data Persistence**: Utilizes `redux-persist` to maintain the application state across sessions.

## Used npm Packages

- `next`: The React framework for server-side rendering.
- `typescript`: A strict syntactical superset of JavaScript that adds optional static typing.
- `@mui/material`: A popular React UI framework that provides Material Design components.
- `axios`: A promise-based HTTP client for making requests.
- `@reduxjs/toolkit`: The official, recommended way to write Redux logic.
- `redux-persist`: A library that enables state persistence in Redux.
- `jest`: A delightful JavaScript testing framework.

## Deploy on Vercel

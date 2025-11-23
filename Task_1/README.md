# Portfolio Web Page

This project is a portfolio web page built using React.js for the frontend and Node.js with Express for the backend.

## Project Structure

- `client/` - React frontend application
- `server/` - Node.js Express backend server

## Available Scripts

### Start React Development Server

From the root folder, run:

```
npm run start-client
```

This will start the React development server at http://localhost:3000.

### Start Backend Server

From the root folder, run:

```
npm run start-server
```

This starts the Express backend server at http://localhost:5000.

### Start Backend Server Only (Production Serve)

Build the React app with:

```
cd client && npm run build
```

Then start the backend server in production mode with:

```
npm start
```

The backend server will serve the built React files.

## Assets

- Favicon and preview image are used in the portfolio.
- Resume PDF is linked in the Resume section.

## Notes

Make sure to install dependencies separately in `client/` and `server/` folders by running:

```
cd client && npm install
cd ../server && npm install

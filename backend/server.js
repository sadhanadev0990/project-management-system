const dotenv = require('dotenv');
const connectDatabase = require("./config/database");


process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

// config
dotenv.config({ path: './config/config.env' });

const app = require('./app');

// connect to database
connectDatabase();

const port = process.env.PORT || 3000;

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App running on port ${port}`);
  }
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION shutting down');
  server.close(() => {
    process.exit(1);
  });
});

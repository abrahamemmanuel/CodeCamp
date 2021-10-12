const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const ConnectDB = require('./config/db');
const errorHandler = require('./app/Http/Middleware/error');

//load env variables and path
dotenv.config({ path: './config/config.env' });

//connect to database
ConnectDB();

//require the bootcamps routes files
const bootcamps = require('./routes/bootcamps');

//initialize express
const app = express();

//body parser
app.use(express.json());

//run morgan if in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//mount routes
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

//create a varibale called PORT and assign it to the env variable PORT
const PORT = process.env.PORT || 5000;

//listen to the port
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
});

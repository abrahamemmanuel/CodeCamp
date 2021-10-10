const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

//load env variables and path
dotenv.config({ path: './config/config.env' });

//require the bootcamps routes files
const bootcamps = require('./routes/bootcamps');

//initialize express
const app = express();

//run morgan if in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//mount routes
app.use('/api/v1/bootcamps', bootcamps);

//create a varibale called PORT and assign it to the env variable PORT
const PORT = process.env.PORT || 5000;

//listen to the port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

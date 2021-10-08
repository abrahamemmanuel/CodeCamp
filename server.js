const express = require('express');
const dotenv = require('dotenv');

//require the bootcamps routes files
const bootcamps = require('./routes/bootcamps');

//oad env variables and path
dotenv.config({ path: './config/config.env' });

//initialize express
const app = express();

//mount routes
app.use('/api/v1/bootcamps', bootcamps);

//create a varibale called PORT and assign it to the env variable PORT
const PORT = process.env.PORT || 5000;

//listen to the port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

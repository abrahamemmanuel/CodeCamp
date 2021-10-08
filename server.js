const express = require('express');
const dotenv = require('dotenv');

//Load env variables and path
dotenv.config({ path: './config/config.env' });

//initialize express
const app = express();

//create a varibale called PORT and assign it to the env variable PORT
const PORT = process.env.PORT || 5000;

//listen to the port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//set mongoosse to use the mongoose library
const mongoose = require('mongoose');

//set the mongoose connection to the mongodb database using async await
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

//export the connectDB function
module.exports = connectDB;
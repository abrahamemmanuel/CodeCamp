//require fs, mongoose, colors and dotenv
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const readline = require('readline');
const asyncHandler = require('./app/Http/Middleware/async');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//load env vars
dotenv.config({ path: './config/config.env' });

//load models
const Bootcamp = require('./app/Models/Bootcamp');
const Course = require('./app/Models/Course');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/database/seeders/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/database/seeders/courses.json`, 'utf-8')
);

//import into db
//run node seeder -i in command line to import data
const importData = asyncHandler(async() => {
    await Bootcamp.create(bootcamps);
    // await Course.create(courses);
    console.log('Data Imported...'.green.inverse);
    process.exit();
});

//delete data
//run node seeder -d in command line to delete data
const deleteData = asyncHandler(async() => {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
});

//if you are not sure if all fake data has been imported or deleted, you can use this function to delete all data or import data
//to do so, simply "run node seeder -c" in command line to check if data is already imported or not
const checkForData = asyncHandler(async() => {
  const bootcamps = await Bootcamp.find();
  const courses = await Course.find();
  if (bootcamps.length > 0 || courses.length > 0) {
    rl.question('This will delete all current data, are you sure? (y/n)', answer => {
      if (answer.toLowerCase() === 'y') {
        deleteData();
      } else {
        console.log('Data not Deleted...'.yellow.inverse);
        process.exit();
      }
    });
  } else if (bootcamps.length === 0 && courses.length === 0) {
    rl.question('This will seed database with fake data, are you sure? (y/n)', answer => {
      if (answer.toLowerCase() === 'y') {
        importData();
      } else {
        console.log('Data not imported...'.yellow.inverse);
        process.exit();
      }
    });
  } 
});

//check if in import or delete mode
if (process.argv[2] === '-i') {
  importData();
}

//check if in import or delete mode
if (process.argv[2] === '-d') {
  deleteData();
}

//check if in import or delete mode
if (process.argv[2] === '-c') {
  checkForData();
}
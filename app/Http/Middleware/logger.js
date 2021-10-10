//create a custom logger middleware and console the protocol and the host
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

//export the logger middleware
module.exports = logger;
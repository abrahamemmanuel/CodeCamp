//create async handler
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

//export async handler
module.exports = asyncHandler;
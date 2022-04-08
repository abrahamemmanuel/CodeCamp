const path = require('path');
const Bootcamp = require('../../../../Models/Bootcamp');
const ErrorResponse = require('../../../../Utils/errorResponse');
const asyncHandler = require('../../../Middleware/async');
const geocoder = require('../../../../Utils/geocoder');

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults); 
});

//@desc Get bootcamp by id
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc Create bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  bootcamp.remove();
  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc Get bootcamp within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  //Calc radius using radians
  //Divide dist by radius of earth
  //Earth radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc Upload photo for bootcamp
// @route /api/v1/bootcamp/:id/photo
// @method PUT 
// @access Private
exports.bootcampPhotoUpload = asyncHandler(async(req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if(!bootcamp) return  next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
  if(!req.files) return  next(new ErrorResponse(`Please upload a file`, 400));
  const file = req.files.file;
  if(!file.mimetype.startsWith('image')) return  next(new ErrorResponse(`Please upload an image file`, 400));
  if(file.size > process.env.MAX_FILE_UPLOAD) 
  return  next(new ErrorResponse(`Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
     if(err) return  next(new ErrorResponse(`Problem with file upload`, 500));
     await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
     return res.status(200).json({  succes: true, data: file.name })
  })
});


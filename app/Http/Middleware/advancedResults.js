const advanacedResults = (model, populate) => async (req, res, next) => {
	//get request query
	let query;
	//create query object to hold all query params
	const reqQuery = { ...req.query };
	//fields to exclude
	const removeFields = ['select', 'sort', 'page', 'limit'];
	//loop over removeFields and delete them from reqQuery
	removeFields.forEach(param => delete reqQuery[param]);
	//create query string
	let queryStr = JSON.stringify(reqQuery);
	//create operators for (gt,gte,lt,lte)
	queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
	//finding resource
	query = model.find(JSON.parse(queryStr));
	//select fields
	if (req.query.select) {
	  const fields = req.query.select.split(',').join(' ');
	  query = query.select(fields);
	}
	//sort fields
	if(req.query.sort){
	  const sortBy = req.query.sort.split(',').join(' ');
	  query = query.sort(sortBy);
	}else{
	  query = query.sort('-createdAt');
	}
	//pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await model.countDocuments();
	query = query.skip(startIndex).limit(limit);
	//populate fields
	if(populate){
		query = query.populate(populate);
	}		
	const results = await query;
	//pagination result
	const pagination = {};
	if (endIndex < total) {
	  pagination.next = {
		page: page + 1,
		limit
	  };
	}
	if (startIndex > 0) {
	  pagination.prev = {
		page: page - 1,
		limit
	  };
	}

	res.advancedResults = {
		success: true,
		count: results.length,
		pagination,
		data: results
	};

	next();
}

module.exports = advanacedResults;
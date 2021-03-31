/* 
The catch Errors Handler.
This is Becuz am using async/await, therefore try and catch just doesn't look
for me so instead of using try{} and catch(e) in each controller am wrapping the function
in catchErrorsHandler() function which will eventaully catch any errors they throw, and will pass it 
along to our express middlewares with the next() function
*/
exports.catchErrorsHandler = func => {
  return function(req, res, next) {
    return func(req, res, next).catch(next);
  };
};

/*
Not found Error Handler
This is if someone hit a route or request for a route that doesn't exist
or simple not found the we mark the route as a 404 and pass it along to the next error handler to 
be displayed for who ever make the request.
*/
exports.notFoundErrorHandler = (req, res, next) => {
  const error = new Error(`Not Found! auh `);
  res.status(404);
  error.status = 404;
  next(error);
};

/*
Development Error Handler
This is to show good and user friendly error during development process, so if we make a syntax 
error or any other previously un-handleed error and we can show good info about what happend.  
*/
// eslint-disable-next-line
exports.developmentErrorsHandler = (error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? 400 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "development" && error.stack
  });
};

/*
Production Error Handler
In production we acctual don't wanna show any stacktraces to the user  
in simple terms "No Stacktraces are leaked to the user"
*/
// eslint-disable-next-line
exports.productionErrorsHandler = (error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: {}
  });
};

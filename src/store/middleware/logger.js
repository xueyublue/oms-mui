const logger = (param) => (store) => (next) => (action) => {
  // console.log("Redux Store", store);
  // console.log("Redux Next", next);
  console.log("Redux Action", action);

  next(action);
};

export default logger;

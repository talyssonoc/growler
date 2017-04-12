const SequelizeErrorMapper = {
  rethrowAsError(error) {
    console.log(error.message);
    console.log(Object.keys(error));

    throw error;
  }
};

module.exports = SequelizeErrorMapper;

exports.success = (reply, data, message = 'Success') => {
    return reply.code(200).send({ status: true, message, data });
  };
  
  exports.error = (reply, message = 'Something went wrong', statusCode = 500) => {
    return reply.code(statusCode).send({ status: false, message });
  };
  
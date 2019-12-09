'use strict';

const application = require('../../application')

module.exports.flights = async => {
  const flights = await application.fetchFlights();
  return {
    statusCode: 200,
    body: JSON.stringify(flights,
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

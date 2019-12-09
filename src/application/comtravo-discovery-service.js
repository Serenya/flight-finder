const rp = require('request-promise');

const comtravoDiscoveryService = {};

comtravoDiscoveryService.getFlights = async function() {
  const endpoints = process.env.ENDPOINTS.split(',');
  const auth = 'Basic ' + new Buffer(process.env.AUTH_USERNAME + ':' + process.env.AUTH_PASSWORD).toString('base64');

  try {
    return await Promise.all(endpoints.map(async endpoint => {
      return await getFlightsRequest(auth, endpoint);
    }));
  } catch (e) {
    if (e.statusCode === 503 || e.error.code === 'ESOCKETTIMEDOUT' || e.error.code === 'ETIMEDOUT') {
      console.warn(e);
      throw new Error('Discovery service temporarily unavailable. Please try again.');
    } else {
      console.error(e);
      throw new Error('Something went wrong.');
    }
  }
};

function getFlightsRequest(auth, endpoint) {
  const options = {
    url: `${process.env.BASE_URL}${endpoint}`,
    method: 'GET',
    headers: {
      'Authorization': auth
    },
    json: true,
    timeout: parseInt(process.env.TIMEOUT)
  };

  return rp(options);
}

module.exports = comtravoDiscoveryService;
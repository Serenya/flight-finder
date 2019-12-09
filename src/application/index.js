const comtravoDiscoveryService = require('./comtravo-discovery-service');

const application = {};

application.fetchFlights = async function() {
  const flightsSources = await comtravoDiscoveryService.getFlights();
  return mergeFlights(flightsSources);
}

mergeFlights = function(flightsSources) {
  const mergedFlights = flightsSources[0];
  const flights_keys = {};
  for (let i = 0; i < mergedFlights.flights.length; i++) {
    let slices = mergedFlights.flights[i].slices;
    let key = getFlightKey(slices);
    flights_keys[key] = true;
  }

  for (let i = 1; i < flightsSources.length; i++) {
    for (let j = 0; j < flightsSources[i].flights.length; j++) {
      let slices = flightsSources[i].flights[j].slices;
      const key = getFlightKey(slices);
      if (!flights_keys[key]) {
        mergedFlights.flights.push(flightsSources[i].flights[j]);
        flights_keys[key] = true;
      } else {
        console.log('Found duplicate key: ' + key);
      }
    }
  }

  return mergedFlights;
}

getFlightKey = function(slices) {
  let key = '';
  for (let i = 0; i < slices.length; i++) {
    key += `${slices[i].departure_date_time_utc}${slices[i].arrival_date_time_utc}${slices[i].flight_number}`
  }

  return key;
}

module.exports = application;
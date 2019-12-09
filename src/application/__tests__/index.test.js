const nock = require('nock');
const application = require('../index');

beforeAll(() => {
  process.env.BASE_URL = 'https://discovery-stub.comtravo.com';
  process.env.ENDPOINTS = '/source1,/source2';
  process.env.TIMEOUT = 900;
  process.env.AUTH_USERNAME = 'ct_interviewee';
  process.env.AUTH_PASSWORD = 'supersecret';
});

beforeEach(() => {
  nock.cleanAll();
  mockComtravoDiscoveryService();
});

const mockComtravoDiscoveryService = function() {
  nock(process.env.BASE_URL, {
    reqheaders: {
    'Authorization': 'Basic Y3RfaW50ZXJ2aWV3ZWU6c3VwZXJzZWNyZXQ='
    }
  })
  .get('/source1')
  .reply(200, {
    flights: [{
      slices: [
        {
            origin_name: "Schonefeld",
            destination_name: "Stansted",
            departure_date_time_utc: "2019-08-08T04:30:00.000Z",
            arrival_date_time_utc: "2019-08-08T06:25:00.000Z",
            flight_number: "144",
            duration: 115
        },
        {
            origin_name: "Stansted",
            destination_name: "Schonefeld",
            departure_date_time_utc: "2019-08-10T05:35:00.000Z",
            arrival_date_time_utc: "2019-08-10T07:35:00.000Z",
            flight_number: "8542",
            duration: 120
        }
      ],
      price: 129
    }, {
      slices: [
        {
            origin_name: "Schonefeld",
            destination_name: "Stansted",
            departure_date_time_utc: "2019-08-08T04:30:00.000Z",
            arrival_date_time_utc: "2019-08-08T06:25:00.000Z",
            flight_number: "3457",
            duration: 115
        },
        {
            origin_name: "Stansted",
            destination_name: "Schonefeld",
            departure_date_time_utc: "2019-08-10T05:35:00.000Z",
            arrival_date_time_utc: "2019-08-10T07:35:00.000Z",
            flight_number: "223",
            duration: 120
        }
      ],
      price: 129
    }]
  });

  nock(process.env.BASE_URL, {
    reqheaders: {
    'Authorization': 'Basic Y3RfaW50ZXJ2aWV3ZWU6c3VwZXJzZWNyZXQ='
    }
  })
  .get('/source2')
  .reply(200, {
    flights: [{
      slices: [
        {
            origin_name: "Schonefeld",
            destination_name: "Stansted",
            departure_date_time_utc: "2019-08-08T04:30:00.000Z",
            arrival_date_time_utc: "2019-08-08T06:25:00.000Z",
            flight_number: "347",
            duration: 115
        },
        {
            origin_name: "Stansted",
            destination_name: "Schonefeld",
            departure_date_time_utc: "2019-08-10T05:35:00.000Z",
            arrival_date_time_utc: "2019-08-10T07:35:00.000Z",
            flight_number: "8542",
            duration: 120
        }
      ],
      price: 129
    }, {
      slices: [
        {
            origin_name: "Schonefeld",
            destination_name: "Stansted",
            departure_date_time_utc: "2019-08-08T04:30:00.000Z",
            arrival_date_time_utc: "2019-08-08T06:25:00.000Z",
            flight_number: "3457",
            duration: 115
        },
        {
            origin_name: "Stansted",
            destination_name: "Schonefeld",
            departure_date_time_utc: "2019-08-10T05:35:00.000Z",
            arrival_date_time_utc: "2019-08-10T07:35:00.000Z",
            flight_number: "223",
            duration: 120
        }
      ],
      price: 129
    }]
  });

  return nock;
};

it("removes duplicated flights", async () => {
  // arrange

  // act
  const result = await application.fetchFlights();

  // assert
  expect(result.flights.length).toBe(3);
});

it("gracefully handles service unavailable response", async () => {
  // TBD
});

it("gracefully handles timeout response", async () => {
  // TBD
});

